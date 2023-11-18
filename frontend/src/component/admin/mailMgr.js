import React, { useState, useContext, useEffect } from 'react';
import { Button, Layout, theme, message, Modal, Form } from 'antd';
import "./Admin.css"
import { sendMail } from "../../services/mail"
import { useForm } from 'antd/es/form/Form';
import Input from 'antd/es/input/Input';
import { CandidateContext } from '../../context/candidate';
import { SendOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Content } = Layout;


const MailMgr = () => {
    const { candidate } = useContext(CandidateContext)
    const [modaOpen, setModaOpen] = useState(false);
    const [form] = useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const confirm = async (e) => {
        setModaOpen(false);
        e.preventDefault();
        try {
            const formData = await form.validateFields();
            let values = Object.entries(formData).reduce((acc, [key, value]) => {
                if (value !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {});
            setLoading(true)
            const res = await sendMail(values)
            if (res.status === 201) {
                setLoading(false)
                message.success('Mail has been sent')
                navigate('/admin/info')
            } else {
                setLoading(false)
                message.error('Oops, something went wrong, check again!')
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi khi gửi email:", error);
        }
    };
    const cancel = (e) => {
        setModaOpen(false);
        message.error('Rejected send');
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        if(candidate){
            form.setFieldsValue({ userEmail: candidate.userId.email })
            form.setFieldsValue({ candidateName: candidate.userId.firstName + " " + candidate.userId.lastName })
        }
    })
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >
            <div style={{ height: "80vh" }} className='w-100 column-center'>
                <div className='Tittle'>Mail to Candidate</div>
                <Form
                    style={{ width: "60%" }}
                    layout="vertical"
                    form={form}
                    className="form_send_mail"
                >
                    <Form.Item
                        name="userEmail"
                        label="Candidate Email"
                        rules={[{ required: true, message: "Please enter Candidate Email!" }]}
                    >
                        <Input
                            placeholder="Please enter Candidate Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="candidateName"
                        label="Candidate Name"
                        rules={[{ required: true, message: "Please enter Candidate Name!" }]}
                    >
                        <Input
                            placeholder="Please enter Candidate Name"
                        />
                    </Form.Item>
                    <Form.Item
                        name="intro"
                        label="Intro"
                        rules={[{ required: true, message: "Please enter Intro!" }]}
                    >
                        <Input
                            placeholder="Please enter Intro"
                        />
                    </Form.Item>
                    <Form.Item
                        name="linkTest"
                        label="Link Test"
                        rules={[{ required: true, message: "Please enter Link Test!" }]}
                    >
                        <Input
                            placeholder="Please enter Link Test"
                        />
                    </Form.Item>
                    <Form.Item
                        name="outro"
                        label="Outro"
                        rules={[{ required: true, message: "Please enter Outro!" }]}
                    >
                        <Input
                            placeholder="Please enter Outro"
                        />
                    </Form.Item>
                    <div className='w-100 flex-center'>
                        <Button icon={<SendOutlined />} loading={loading} style={{ height: "40px", marginTop: "12px" }} type='primary' shape='round'
                            onClick={() => setModaOpen(true)}
                        >Send Mail</Button>
                    </div>
                    <Modal
                        title="Send mail to Candidate"
                        centered
                        open={modaOpen}
                        onOk={confirm}
                        onCancel={cancel}
                        okText="Confirm"
                        cancelText="Cancel">
                        <p>Are you sure to send this mail?</p>
                    </Modal>
                </Form>
            </div>
        </Content>
    );
}
export default MailMgr



