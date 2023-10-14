import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { signUp } from '../../services/auth';
import { showMessage } from '../../helper/showMessage';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handelRegister = async () =>
    {
        const values = await form.validateFields()
        try{
            const response = await signUp(values);
            const { status, message } = response.data;
            showMessage(status, message);
            if (Math.floor(status / 100) === 2){
                navigate('/login')
            }

        }catch(e){
            console.log('Error:', e.message);
        }
   
    }





    return (
        <div className='register_form'>
            <Form
                onFinish={handelRegister}
                form={form}
                layout='vertical'
                style={{ width: '100%' }}
            >
                <div className="flex-between w-100 register_name">
                    <Form.Item
                        name="firstName"
                        label= "Fisrt Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name',
                            },
                        ]}>
                        <Input
                            type="text"
                            placeholder="Input first name"
                            name="firstName"
                        />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Input last name"
                            type="text"
                            name="lastName"
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email',
                        },
                    ]}>
                    <Input
                        placeholder="Input email"
                        type="email"
                        name="email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password',
                        },
                    ]}
                >
                    <Input.Password
                        placeholder="Input password"
                        type="password"
                        name="password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password',
                        },
                    ]}>
                    <Input.Password
                        placeholder="Confirm password"
                        type="password"
                        name="confirmPassword"
                        iconRender={(visible) => (visible ? <EyeTwoTone twoToneColor={'#e8d207'}/> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <div className='flex-center' style={{marginTop: '20px'}}>
                    <Button type='primary' htmlType='submit'>Register</Button>
                </div>
            </Form>
        </div>
    )
}

export default RegisterForm