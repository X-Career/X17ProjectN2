import React from "react";
import LoginForm from "../component/login";
import { Row, Col } from "antd"
import { Link } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';

const Login = () => {
    return (
        <div className="login_wrapper">
            <Row justify="space-around" className="w-100" >
                <Col span={10}>
                    <div className="flex-start">
                        <Link to={'/'}><span style={{ cursor: 'pointer' }}><HomeOutlined style={{ fontSize: '200%' }} /></span></Link>
                    </div>
                </Col>
                <Col span={10} style={{ textAlign: 'end' }}>
                    <p className="text-white">Don't have an account? <Link to={'/register'}><b>Register</b></Link></p>
                </Col>
            </Row>
            <div className="flex-center w-100 h-100">
                <LoginForm />
            </div>
            <div className="w-100">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            </div>
        </div>
    )
}

export default Login