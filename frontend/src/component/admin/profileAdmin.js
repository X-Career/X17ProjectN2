import React from 'react';
import { Button, Col, Layout, Row, theme } from 'antd';
import "./Admin.css"
import { EditOutlined } from '@ant-design/icons';

const { Content } = Layout;


const ProfileAdmin = () => {
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
            <div>
                <div className='Tittle'>Profile Admin</div>
                <div>
                    <Row>
                        <Col md={10}>
                            <div className='ProfileAdmin'>
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
                                    <h2>taibooi97@gmail.com</h2>
                                </div>
                                <div className='renderRole'>
                                    Admin
                                </div>
                            </div>
                        </Col>
                        <Col md={14}>
                            <div className='ProfileAdmin'>
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
                                    <div className="Tittle_Element">
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



