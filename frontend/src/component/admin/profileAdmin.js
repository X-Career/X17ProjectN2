import React from 'react';
import { Col, Layout, Row, theme} from 'antd';

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
                        <h2>Profile Admin</h2>
                        <div>
                         <Row>
                            <Col md={10}>
                                <div style={{display:"flex", alignItems:"center", flexDirection:"column", gap:"15px",border:"solid", borderRadius:"30px",padding:"15px 0", width:"350px", margin:"auto", borderColor:"#e8d207"}}> 
                                    <div style={{display:"flex", width:"200px"}}>
                                    <img src="../images/avatar.jpeg" style={{ width: '100%'}} />
                                    </div>
                                    <div className='renderEmail'>
                                    <h3>taibooi97@gmail.com</h3>
                                    </div>
                                    <div className='renderRole'>
                                    Admin
                                    </div>
                                </div>
                            </Col>
                            <Col md = {14}>
                                Hi
                            </Col>
                         </Row>
                        </div>
                    </div>
                </Content>
    );
}
export default ProfileAdmin



