import React from "react";
import LoginForm from "../component/login";
import { Row, Col } from "antd"
import { Link } from "react-router-dom";
import { HomeTwoTone } from '@ant-design/icons';

const Login = () => {
    return (
        <div className="login_wrapper">
            <Row justify="space-around" className="w-100" >
                <Col span={10}>
                    <div className="flex-start">
                        <Link to={'/'}><span style={{ cursor: 'pointer' }}><HomeTwoTone twoToneColor="#e8d207" style={{ fontSize: '200%' }} /></span></Link>
                    </div>
                </Col>
                <Col span={10} style={{ textAlign: 'end' }}>
                    <p>Don't have an account? <Link to={'/register'}><b>Register</b></Link></p>
                </Col>
            </Row>
            <div className="flex-center w-100 h-100">
                <LoginForm />
            </div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
        </div>
    )
}

export default Login