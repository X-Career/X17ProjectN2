import { Button, Row, Col } from "antd"
import React from "react"
import { Link } from "react-router-dom";
import { HomeTwoTone } from '@ant-design/icons';

const Banner = () => {
    return (
        <div className="w-100 column-center" style={{ height: '25rem', backgroundColor: '#f8f8f8' }}>
            <Row justify="space-around" className="w-100"  style={{ backgroundColor: '#f8f8f8'}}>
                <Col span={10}>
                    <div className="flex-start">
                        <Link to={'/'}><span style={{ cursor: 'pointer' }}><HomeTwoTone twoToneColor="#e8d207" style={{ fontSize: '200%' }} /></span></Link>
                    </div>
                </Col>
              <Col span={10} style={{textAlign: 'end'}}>
                    <p>Have an account? <Link to={'/login'}><b>Log in</b></Link></p>
              </Col>
            </Row>
            <img src="../images/banner.png" style={{width: '60vw'}}/>
        </div>
    )
}

export default Banner