import React from "react";
import { Row, Col, Input } from "antd"
import { LinkedinFilled, FacebookFilled, SkypeFilled, PhoneOutlined, MailOutlined, TwitterCircleFilled, MoreOutlined, PushpinOutlined, NodeIndexOutlined } from '@ant-design/icons';

const Footer = () => {
    const { Search } = Input;
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    return (
        <div className="footer">
            <Row justify="space-evenly" className="footer_main"> 
                <Col span={5} className="align-items-center">
                    <img src="../images/logo.webp" style={{ width: '150px' }} />
                    <div style={{padding: '18px'}}>We, Itechco aim to provide the quintessence and value of technology to businesses in Vietnam and Asia Pacific.</div>
            
                </Col>
                <Col span={3}>
                    <div className="footer_title"><MoreOutlined />SERVICE</div>
                    <li><NodeIndexOutlined style={{ marginRight: '8px' }}/>Cloud E-learning</li>
                    <li><NodeIndexOutlined style={{ marginRight: '8px' }}/>Digital Content</li>
                    <li><NodeIndexOutlined style={{ marginRight: '8px' }}/>Software Production</li>
                    <li><NodeIndexOutlined style={{ marginRight: '8px' }}/>Platform Systems</li>
                </Col>
                <Col span={3}>
                    <div className="footer_title"><MoreOutlined />CONTACT</div>
                    <li><MailOutlined style={{ marginRight: '8px' }} /><b>Email:</b> abcd@gmail.com</li>
                    <li><PhoneOutlined style={{ marginRight: '8px' }} /><b>Hotline:</b> 0987654321</li>
                </Col>
                <Col span={3}>
                    <div className="footer_title"><MoreOutlined />OFFICE</div>
                    <li><PushpinOutlined style={{ marginRight: '8px' }} /><b>Address:</b> 20, Than Nhan Trung, Tan Binh District, Ho Chi Minh City</li>
                    <li><PushpinOutlined style={{ marginRight: '8px' }} /><b>Address:</b> 20, Than Nhan Trung, Tan Binh District, Ho Chi Minh City</li>
                </Col>
                <Col span={5}>
                    <div className="footer_title">EMAIL TO HELP</div>
                    <div className="footer_mail_box w-100">
                        <Search
                            placeholder="Example@gmail.com"
                            allowClear
                            enterButton="Submit"
                            size="large"
                            onSearch={onSearch}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="after_footer">
                <Col span={12} className="flex-center relative">
                    <div className="left"></div>
                    <b className="left_content">Copyrights 2023. All Rights are Reserved by Dev Quyen</b>
                </Col>
                <Col span={12}>
                    <div className="contact_box">
                        <LinkedinFilled />
                        <FacebookFilled />
                        <SkypeFilled />
                        <TwitterCircleFilled />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Footer