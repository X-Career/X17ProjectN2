import { Row, Col, Button, Dropdown, Space } from "antd"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { useContext , useEffect, useState} from "react";
import { logOut } from "../services/auth";
import { ExclamationCircleFilled } from '@ant-design/icons';
import {Modal} from "antd";

const Header = () =>{
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    const { confirm } = Modal;
    const token = localStorage.getItem('token')
    const [isSticky, setIsSticky] = useState(false);

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
            label: <a href="user"><b>{user.firstName} {user.lastName}</b><div>{user.role}</div></a>,
            key: '0',
        },
        {
            type: 'divider',
        },
        token && user.role === 'admin' && {
            label: <a style={{ marginTop: '3rem' }} href="admin">Admin</a>,
            key: '2',
        },
        token && {
            label: <a onClick={showConfirm}>Log out</a>,
            key: '3',
        },
        !token && {
            label: <a href="/login">Log In</a>,
            key: '3',
        }

    ].filter(Boolean);

    
    const logOutAcc = async () => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
        try {
            const res = logOut();
            localStorage.removeItem('token');
            localStorage.setItem('user', JSON.stringify({firstName: 'Guest', role: ''}))
            setUser({ firstName: 'Guest'})
            navigate('/login')
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const threshold = 100; // Điều kiện cuộn để header thành sticky
            const newIsSticky = scrollTop > threshold;
            setIsSticky(newIsSticky);

        };

        window.addEventListener('scroll', handleScroll);
        // Gỡ bỏ bộ lắng nghe khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`${isSticky ? 'header_sticky' : ''} header_box w-100`}>
            <Row justify="space-evenly">
                <Col span={8}><Link style={{ alignItems: 'center', display: 'flex', height: '100%'}} to={'/'}><img src="../images/logo.webp" style={{ width: '120px' }} /></Link></Col>
                <Col span={8} style={{display: 'flex', alignItems: 'center'}}>
                    <Button className={`${isSticky ? 'btn_color_sticky' : ''} header_btn`} onClick={() => navigate('/')}>Home</Button>
                    <Button className={`${isSticky ? 'btn_color_sticky' : ''} header_btn`} onClick={() => navigate('/jobs')} >Job</Button>
                    <Button className={`${isSticky ? 'btn_color_sticky' : ''} header_btn`}>About US</Button>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()} style={{ marginLeft: '2rem'}}>
                            <Space>
                                <img src={user.img} style={{width: '50px', height:'50px', borderRadius: '100%'}} />
                            </Space>
                        </a>
                    </Dropdown>
                </Col>
            </Row>

        </div>
    )
}

export default Header