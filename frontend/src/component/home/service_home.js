import React from "react";
import { Row, Col } from "antd";
import { CloudServerOutlined, 
    PieChartOutlined,
     DotChartOutlined, 
     MobileOutlined, 
     GlobalOutlined, 
     FundProjectionScreenOutlined, 
     ShareAltOutlined, 
     UserSwitchOutlined
 } from '@ant-design/icons';

const Service = () => {
    return (
        <div className="flex-center service_box">
            <Row gutter={[32, 32]} justify="center" className="w-70">
                <Col span={6}>
                    <div className="service_item">
                        <CloudServerOutlined />
                        <div className="title">Cloud E-learning</div>
                        <p>Service information, benefit, conditions</p>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="service_item">
                        <PieChartOutlined />
                        <div className="title">Platform Systems</div>
                        <p>Platform systems</p>
                    </div>
                </Col>

                <Col span={6}>
                    <div className="service_item">
                        <DotChartOutlined />
                        <div className="title">Social media marketing</div>
                        <p>Service information, benefit, conditions</p>
                    </div>
                </Col>

                <Col span={6}>
                    <div className="service_item">
                        <MobileOutlined />
                        <div className="title">Video Motion Graphic</div>
                        <p>Service information, benefit, conditions</p>
                    </div>
                </Col>

                <Col span={6}>
                    <div className="service_item">
                        <GlobalOutlined />
                        <div className="title">Digital Content</div>
                        <p>Service information, benefit, conditions</p>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="service_item">
                        <FundProjectionScreenOutlined />
                        <div className="title">Software production</div>
                        <p>Service information, benefit, conditions</p>
                    </div>
                </Col>

                <Col span={6}>
                    <div className="service_item">
                        <ShareAltOutlined />
                        <div className="title">Elearning Content Design</div>
                        <p>Service information, benefit, conditions</p>
                    </div>
                </Col>

                <Col span={6}>
                    <div className="service_item">
                        <UserSwitchOutlined />
                        <div className="title">Build Website for branding</div>
                        <p>Mobile office is a service that fully</p>
                    </div>
                </Col>

            </Row>
        </div>
    )
}

export default Service