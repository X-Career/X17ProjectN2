import React, { useContext, useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { CandidateContext } from "../../context/candidate";
import { Row, Col, Timeline, Form, Input, InputNumber, Select, Button, DatePicker, message } from "antd";
import './candidate.css'
import { useForm } from "antd/es/form/Form";
import { MailOutlined, CloseOutlined, EnterOutlined, SendOutlined, CheckOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { editCandidate } from "../../services/candidate";
import { useNavigate } from "react-router-dom";
import { ActiveContext } from "../../context/active_menu";

const Info = () => {
    const { candidate } = useContext(CandidateContext)
    const [active, setActives] = useState(0)
    const { setActive } = useContext(ActiveContext)
    const navigate = useNavigate()
    const [form] = useForm();
    const { TextArea } = Input;

    const handleChange = (value) => {
        setActives(value)
        if (value == 1) {
            form.setFieldsValue({ status: 'Interviewing' })
        } else if(value == 2) {
            form.setFieldsValue({ status: 'Rejected' })
        }
    }
    const handleRevert = () => {
        navigate('/admin/recruit-manager')
    }

    useEffect(() => {
        if (candidate.status == 'Testing') {
            setActive(1)
            form.setFieldsValue({ point: candidate.point })
            form.setFieldsValue({ result: candidate.result })
        } else if (candidate.status == 'Rejected') {
            setActive(2)
            form.setFieldsValue({ denyReason: candidate.denyReason })
        }
    })

    const handleConfirm = async () => {
        try {
            const formData = await form.validateFields();
            let values = Object.entries(formData).reduce((acc, [key, value]) => {
                if (value !== '') {
                    acc[key] = value;
                }
                if (key === 'datetoInter' || key === 'datetoGetjob') {
                    if (value) {
                        acc[key] = dayjs(value).format('YYYY-MM-DD HH:mm');
                    }
                    acc['denyReason'] = null;
                }
                if (key === 'denyReason') {
                    acc['datetoInter'] = null;
                    acc['datetoGetjob'] = null;
                    acc['point'] = null;
                    acc['result'] = null;
                }
                acc['userId'] = candidate.userId._id
                acc['recruitId'] = candidate.recruitId
                acc['fileCV'] = candidate.fileCV[0]
                acc['jobId'] = candidate.jobId._id
                return acc;
            }, {});
            const res = await editCandidate(candidate._id, values)
            if (res.status === 200) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }

        } catch (error) {
            console.log("Error:", error.message);
        }
    }
    const mailPage = () => {
        setActive("mail-manager")
        navigate("/admin/mail-manager")
    }

    return (

        <Content
            id='profile'
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 800,
                backgroundColor: '#262d35'
            }}
        >
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <Row className="flex-center w-100 info-main">
                <Col span={22}>
                    <Timeline
                        items={[
                            {
                                className: 'candidate_info',
                                children:
                                    (
                                        <Row justify='space-between'>
                                            <Col span={24} className="flex-between">
                                                <h3 className="timeline_title">INFOMATION</h3>
                                                <div>
                                                    <Button icon={<MailOutlined />} className={active == 0 ? 'change_status_btn_active' : 'change_status_btn'} onClick={() => handleChange(0)}>
                                                        Mail
                                                    </Button>
                                                    <Button icon={<CheckOutlined />} className={active == 1 ? 'change_status_btn_active' : 'change_status_btn'} onClick={() => handleChange(1)}>
                                                        Accept
                                                    </Button>
                                                    <Button icon={<CloseOutlined />} className={active == 2 ? 'change_status_btn_active' : 'change_status_btn'} onClick={() => handleChange(2)}>
                                                        Reject
                                                    </Button>
                                                    <Button icon={<EnterOutlined />} className="change_status_btn" onClick={handleRevert}>
                                                        Revert
                                                    </Button>

                                                </div>

                                            </Col>

                                            <Col span={14} className="flex-start">
                                                <div className="img_box">
                                                    <img className="img" src={candidate.userId.img} style={{ width: '120px', borderRadius: "100%" }} />
                                                </div>
                                                <div className="name_job column-start">
                                                    <h1 className="text-white">{candidate.userId.firstName} {candidate.userId.lastName}</h1>

                                                    <h2 style={{ color: '#e8d207' }}>{candidate.jobId.name}</h2>
                                                </div>
                                            </Col>


                                            <Col span={14}>
                                                <Form
                                                    layout='vertical'
                                                    style={{ width: '100%' }}
                                                >
                                                    <div className='flex-between'>
                                                        <Form.Item
                                                            style={{ width: '49%' }}
                                                            label='First Name'
                                                        >
                                                            <Input value={candidate.userId.firstName} readOnly={true} />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label='Last Name'
                                                            style={{ width: '49%' }}
                                                        >
                                                            <Input value={candidate.userId.lastName} readOnly={true} />
                                                        </Form.Item>
                                                    </div>

                                                    <div className='flex-between'>
                                                        <Form.Item
                                                            label='Gender'
                                                            style={{ width: '49%' }}
                                                        >
                                                            <Input value={candidate.userId.gender} readOnly={true} />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label='Age'
                                                            style={{ width: '49%' }}
                                                        >
                                                            <InputNumber style={{ width: '100%' }} value={candidate.userId.age} readOnly={true} />
                                                        </Form.Item>
                                                    </div>
                                                    <div className='flex-between'>
                                                        <Form.Item
                                                            label='Email'
                                                            style={{ width: '49%' }}
                                                        >
                                                            <Input value={candidate.userId.email} readOnly={true} />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label='Phone number'
                                                            style={{ width: '49%' }}
                                                        >
                                                            <InputNumber style={{ width: '100%' }} value={candidate.userId.phone} readOnly={true} />
                                                        </Form.Item>
                                                    </div>
                                                    <div className='flex-between'>
                                                        <Form.Item
                                                            label='Date apply'
                                                            style={{ width: '49%' }}
                                                        >
                                                            <Input value={dayjs(candidate.createdAt).format('DD-MM-YYYY')} readOnly={true} />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label='Status'
                                                            style={{ width: '49%' }}
                                                        >
                                                            <Input style={{ width: '100%' }} value={candidate.status} readOnly={true} />
                                                        </Form.Item>
                                                    </div>
                                                </Form>
                                            </Col>
                                            {active !== 0 ? (
                                                <Col span={8}>
                                                    <Form
                                                        layout="vertical"
                                                        form={form}
                                                    >
                                                        <Form.Item
                                                            label='Status'
                                                            name='status'
                                                            style={{ width: '100%' }}
                                                        >
                                                            <Input value='' readOnly={true} />
                                                        </Form.Item>
                                                        {active == 1 ? (
                                                            <>
                                                                <Form.Item
                                                                    label='Date to inter'
                                                                    name='datetoInter'
                                                                    style={{ width: '100%' }}
                                                                    rules={[{ required: true, message: "Please enter date to inter of job!" }]}
                                                                    initialValue={candidate.datetoInter ? dayjs(candidate.datetoInter, 'YYYY-MM-DD HH:mm') : undefined}
                                                                >
                                                                    <DatePicker
                                                                        showTime={{
                                                                            format: 'HH:mm',
                                                                        }}
                                                                        format='YYYY-MM-DD HH:mm'
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label='Date to get job'
                                                                    name='datetoGetjob'
                                                                    style={{ width: '100%' }}
                                                                    initialValue={candidate.datetoGetjob ? dayjs(candidate.datetoGetjob, 'YYYY-MM-DD HH:mm') : undefined}
                                                                >
                                                                    <DatePicker
                                                                        showTime={{
                                                                            format: 'HH:mm',
                                                                        }}
                                                                        format='YYYY-MM-DD HH:mm'
                                                                    />
                                                                </Form.Item>
                                                                <div className='flex-between'>
                                                                    <Form.Item
                                                                        label='Point'
                                                                        name='point'
                                                                        style={{ width: '49%' }}
                                                                    >
                                                                        <Input style={{ width: '100%' }} value={candidate.point} readOnly={true} />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        label='Result'
                                                                        name='result'
                                                                        style={{ width: '49%' }}
                                                                    >
                                                                        <Input style={{ width: '100%' }} value={candidate.result} readOnly={true} />
                                                                    </Form.Item>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <Form.Item
                                                                label='Deny reason'
                                                                name='denyReason'
                                                                style={{ width: '100%' }}
                                                            >
                                                                <TextArea
                                                                    rows={4}
                                                                    placeholder='Enter your reason'
                                                                />
                                                            </Form.Item>
                                                        )}

                                                        <Form.Item className="flex-center">
                                                            <Button type="primary" onClick={handleConfirm}>
                                                                {active == 1 ? "Accept" : "Reject"}
                                                            </Button>
                                                        </Form.Item>
                                                    </Form>
                                                </Col>
                                            ) : (
                                                <div className="column-center" style={{ height: '400px', marginTop: '-5rem' }}>
                                                    <img style={{ width: '250px' }} src="../images/mail.png" />
                                                    <Button type="primary" icon={<SendOutlined />} onClick={mailPage}>Send mail</Button>
                                                </div>
                                            )}
                                        </Row>
                                    )
                                ,
                            },
                            {
                                children: (
                                    <Row>

                                        <Col span={14} className="timeline_title">
                                            ATTACHMENT
                                        </Col>
                                        <Col span={14} className="flex-center">
                                            {/* <iframe src={candidate.fileCV[0]} width="100%" height="500"></iframe> */}
                                        </Col>
                                    </Row>
                                ),
                            },

                        ]}
                    />
                </Col>
            </Row>
        </Content>
    )
}

export default Info