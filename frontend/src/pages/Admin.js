import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
    LogoutOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReconciliationOutlined,
    UploadOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import { ActiveContext } from '../context/active_menu';
const { Header, Sider } = Layout;


const Admin = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { active, setActive } = useContext(ActiveContext);


    return (
        <Layout>
            <Sider width={'300px'} trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical flex-center" style={{ padding: '20px' }}>
                    <img src="../images/logo.webp" style={{ width: '80%' }} />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={active}
                    onClick={(data) => {
                        navigate('/Admin/' + data.key)
                        setActive(data.key)
                    }}
                    items={[
                        {
                            key: 'ProfileAdmin',
                            icon: <UserOutlined />,
                            label: "Profile",
                        },
                        {
                            key: 'RecruitMgr',
                            icon: <ReconciliationOutlined />,
                            label: "Recruit Management",

                        },
                        {
                            key: 'MailMgr',
                            icon: <MailOutlined />,
                            label: 'Mail Management',
                        },
                        {
                            key: 'JobMgr',
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
                    <Row>
                        <Col md={18} style={{ justifyContent: "space-between" }}>
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
                        <Col md={6}>
                            <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
                                <div className='avatar' style={{ display: "flex", width: "40px" }}>
                                    <img src="../images/avatar.jpeg" style={{ width: '100%' }} />
                                </div>
                                <span>Admin</span>
                                <LogoutOutlined />
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Outlet />
            </Layout>
        </Layout>
    );
}
export default Admin