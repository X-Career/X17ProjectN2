import { Row, Col, Button, Dropdown, Space } from "antd"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { useContext } from "react";
import { logOut } from "../services/auth";
import { ExclamationCircleFilled } from '@ant-design/icons';
import {Modal} from "antd";

const Header = () =>{
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    const { confirm } = Modal;
    const token = localStorage.getItem('token')

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
        token && {
            label: <p className="font-14">{user.role}</p>,
            key: '1',
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
        if (!localStorage.getItem('token', '')) {
            navigate('/sign_in')
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


    return (
        <div className="w-100 header_box">
            <Row justify="space-evenly">
                <Col span={8}><Link style={{ alignItems: 'center', display: 'flex', height: '100%'}} to={'/'}><img src="../images/logo.webp" style={{ width: '120px' }} /></Link></Col>
                <Col span={8} style={{display: 'flex', alignItems: 'center'}}>
                    <Button className="header_btn">Home</Button>
                    <Button className="header_btn">Job</Button>
                    <Button className="header_btn">About US</Button>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()} style={{ marginLeft: '2rem'}}>
                            <Space>
                                <img src="https://res.cloudinary.com/dz96u1u2a/image/upload/v1683774881/d970d56d5350d2624041937de985370c_fzbyaf.jpg" style={{width: '50px', borderRadius: '100%'}} />
                            </Space>
                        </a>
                    </Dropdown>
                </Col>
            </Row>

        </div>
    )
}

export default Header