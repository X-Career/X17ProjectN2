import { useForm } from "antd/es/form/Form"
import React from "react"
import { useState } from "react";
import Form from "antd/es/form/Form";
import { Input, Carousel, Button, Checkbox } from "antd";
import { LogoutOutlined } from '@ant-design/icons';

const LoginForm = () => {
    const [form] = useForm();
    const [checked, setChecked] = useState(true);
   
    const toggleChecked = () => {
        setChecked(!checked);
    };

    const checkRemember = (e) => {
        setChecked(e.target.checked);
    };

    const handelLogin = () => {
        const values = form.validateFields()
        console.log(values);
    }
    return (
        <div className="flex-between login_form w-100">
            <div className="h-100 w-50">
                <Carousel autoplay>
                    <img src="../images/login_carousel01.png" className="login_carousel"/>
                    <img src="../images/login_carousel02.png" className="login_carousel" />
                </Carousel>
            </div>
            <div className="column-center w-50">
                <img src="../images/logo.webp" style={{ width: '150px', marginBottom: '32px' }} />
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handelLogin}
                    style={{ width: '250px' }}
                >
                    <Form.Item
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email',
                            },
                        ]}
                    >
                        <Input
                            name="email"
                            placeholder="Email"
                            type="text"
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password',
                            },
                        ]}
                    >
                        <Input
                            name="password"
                            placeholder="Password"
                            type="password"
                        />
                    </Form.Item>
                    <Checkbox checked={checked}  onChange={checkRemember}>Remember</Checkbox>
                    <div className="flex-center">
                        <Button htmlType="submit" className="login_btn"><LogoutOutlined style={{ fontSize: '32px', color: '#e8d207  '}}/></Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default LoginForm