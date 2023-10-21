import React, { useContext } from 'react';
import { Button, Col, Layout, Row, theme } from 'antd';
import "./Admin.css"
import { EditOutlined } from '@ant-design/icons';
import { UserContext } from '../../context/user';


const { Content } = Layout;


const ProfileAdmin = () => {
    const { user, setUser } = useContext(UserContext)
    console.log(user)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >
            <div style={{height:"100vh"}}>
                <div className='Tittle'>Profile Admin</div>
                <div>
                    <Row>
                        <Col md={10}>
                            <div className='Profile_Container'>
                                <div className='renderAva'>
                                    <img src="../images/avatar.jpeg" style={{ width: '100%' }} />
                                </div>
                                <label className="edit-img">
                                    <EditOutlined />
                                    <input
                                        style={{ display: 'none' }}
                                        type="file"
                                        accept="image/*"
                                    />
                                    Edit
                                </label>
                                <div className='renderEmail'>
                                    <h2>{user.email}</h2>
                                </div>
                                <div className='renderRole' style={{textTransform:"capitalize"}}>
                                    {user.role}
                                </div>
                            </div>
                        </Col>
                        <Col md={14}>
                            <div className='Profile_Container'>
                                <div className='Tittle' style={{fontSize:"30px"}}>Edit acount</div>
                                <form>
                                    <div className="Tittle_Element">First Name:</div>
                                    <input
                                        className='TE_Input'
                                        type="text"
                                        placeholder="Please enter your new name."
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Last Name:</div>
                                    <input
                                        className='TE_Input'
                                        type="text"
                                        placeholder="Please enter your new name."
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Your Email:</div>
                                    <input
                                        className='TE_Input'
                                        type="email"
                                        placeholder="Please enter your new email."
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Password:</div>
                                    <input
                                        className='TE_Input'
                                        type="password"
                                        placeholder="Please enter your new password."
                                    />
                                    <div className="Tittle_Element" style={{color:"red"}}>
                                    <hr/>
                                        *You will be logged out of your account after changing your email.{" "}
                                    </div>
                                    <Button className="Tittle_Element" style={{height:"40px", marginTop:"12px"}} type='primary' shape='round'>Update Your Profile</Button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Content>
    );
}
export default ProfileAdmin



