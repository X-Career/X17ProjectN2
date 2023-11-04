import React, { useState } from 'react';
import { Button, Layout, theme, message, Modal, Form, Item } from 'antd';
import "./Admin.css"
import { sendMail } from "../../services/mail"
import { useForm } from 'antd/es/form/Form';
import Input from 'antd/es/input/Input';


const { Content } = Layout;


const MailMgr = () => {
    const [modaOpen, setModaOpen] = useState(false);
    const [form] = useForm();
    const confirm = async (e) => {
        e.preventDefault();
        try {
            const formData = await form.validateFields();
            let values = Object.entries(formData).reduce((acc, [key, value]) => {
                if (value !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {});
            console.log(values);
                const res = await sendMail(values)
                console.log(res)
                setModaOpen(false);
                setTimeout(() => {
                    message.success('Mail has been sent')
                }, 3000);
            
        } catch (error) {
            console.error("Đã xảy ra lỗi khi gửi email:", error);
        }
    };
    console.log(confirm)
    const cancel = (e) => {
        console.log(e);
        setModaOpen(false);
        message.error('Rejected send');
    };

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
            <div style={{ height: "100vh" }}>
                <div className='Tittle'>Mail to Candidate</div>
                <div>
                    {/* <div className='Profile_Container' style={{ width: "80%", margin: "auto" }}> */}
                    <Form
                        style={{ width: "100%" }}
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
                        <Button className="Tittle_Element" style={{ height: "40px", marginTop: "12px" }} type='primary' shape='round'
                            onClick={() => setModaOpen(true)}
                        >Send Mail</Button>
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
                    {/* </div> */}
                </div>
            </div>
        </Content>
    );
}
export default MailMgr



