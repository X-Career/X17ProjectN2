import React from "react";
import LoginForm from "../component/login/form";
import { Button, Row, Col } from "antd"
import { Link } from "react-router-dom";
import { HomeFilled } from '@ant-design/icons';

const Login = () => {
    return (
        <div className="login_wrapper">
            <Row justify="space-around" className="w-100" >
                <Col span={10}>
                    <div className="flex-start">
                        <span style={{ cursor: 'pointer' }}><HomeFilled style={{ fontSize: '200%', color: "#e8d207" }} /></span>
                        <img src="../images/logo.webp" style={{ width: '100px', marginLeft: '12px' }} />
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