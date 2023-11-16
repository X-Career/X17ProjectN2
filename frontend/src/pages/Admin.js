import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReconciliationOutlined,
    UploadOutlined,
    UserOutlined,
    ExclamationCircleFilled
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col, Dropdown, Modal, Space } from 'antd';
import { useNavigate , Link} from "react-router-dom";
import { ActiveContext } from '../context/active_menu';
import { UserContext } from '../context/user';
import { logOut } from '../services/auth';
const { Header, Sider } = Layout;


const Admin = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)
    const [collapsed, setCollapsed] = useState(false);
    const token = localStorage.getItem('token')
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { confirm } = Modal;
    const { active, setActive } = useContext(ActiveContext);
    const logOutAcc = async () => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
        try {
            const res = logOut();
            localStorage.removeItem('token');
            localStorage.setItem('user', JSON.stringify({ firstName: 'Guest', role: '' }))
            setUser({ firstName: 'Guest' })
            navigate('/login')
        }
        catch (e) {
            console.log(e);
        }
    }

    const showConfirm = () => {
        confirm({
            title: 'Log Out ',
            icon: <ExclamationCircleFilled />,
            content: 'Do you really want to log out?',
            onOk() {
                logOutAcc();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const items = [
        {
            label: <b>{user.firstName} {user.lastName}</b>,
            key: '0',
        },
        {
            type: 'divider',
        },
        token && {
            label: <a style={{ marginTop: '3rem' }} href="/">Home</a>,
            key: '2',
        },
        token && {
            label: <a onClick={showConfirm}>Log out</a>,
            key: '3',
        },
    ].filter(Boolean);


    return (
        <Layout style={{height: '100%'}}>
            <Sider width={'300px'} trigger={null} collapsible collapsed={collapsed} style={{minHeight: '100%'}}>
                <div className="demo-logo-vertical flex-center" style={{ padding: '20px' }}>
                    <Link to={'/'} className="flex-center">
                        {collapsed ? <img src="../images/logo_small.webp" style={{ width: '90%' }} /> : <img src="../images/logo.webp" style={{ width: '60%' }} /> }
                        </Link>
                </div>
                <Menu
                    style={{ backgroundColor: '#12141b'}}
                    mode="inline"
                    selectedKeys={active}
                    onClick={(data) => {
                        navigate('/admin/' + data.key)
                        setActive(data.key)
                    }}
                    items={[
                        {
                            key: 'profile-admin',
                            icon: <UserOutlined />,
                            label: "Profile",
                        },
                        {
                            key: 'recruit-manager',
                            icon: <ReconciliationOutlined />,
                            label: "Recruit Management",

                        },
                        {
                            key: 'mail-manager',
                            icon: <MailOutlined />,
                            label: 'Mail Management',
                        },
                        {
                            key: 'job-manager',
                            icon: <UploadOutlined />,
                            label: 'Job Management',
                        },
                    ]}
                >
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Col span={18}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Col>
                        <Col span={6} className='admin_control'>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                trigger={['click']}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <img src={user.img} style={{ width: '50px', height: '50px', borderRadius: '100%' }} />
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
                <Outlet/>
            </Layout>
        </Layout>
    );
}
export default Admin