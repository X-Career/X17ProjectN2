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
    const { candidate, setCandidate } = useContext(CandidateContext)
    const [active, setActives] = useState(0)
    const { setActive } = useContext(ActiveContext)
    const navigate = useNavigate()
    const [form] = useForm();
    const { TextArea } = Input;
    const [hasResult, setResult] = useState(false)
    const [status, setStatus] = useState(null)

    const handleChange = (value) => {
        setActives(value)
        if (value == 1) {
            form.setFieldsValue({ status: 'Interviewing' })
        } else if (value == 2) {
            form.setFieldsValue({ status: 'Rejected' })
        }
    }
    const handleRevert = () => {
        setCandidate({})
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
        } else if (candidate.status == 'Interviewing') {
            setActive(1)
            setResult(true)
        } else if (candidate.status == 'Applying'){
            setActive(0)
        }
    }, [])

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
                }
                if (key === 'status' && acc[key] === 'Interviewing'){
                    acc['result'] = status
                }
                acc['userId'] = candidate.userId._id
                acc['recruitId'] = candidate.recruitId
                acc['fileCV'] = candidate.fileCV[0]
                acc['jobId'] = candidate.jobId._id
                return acc;
            }, {});

            const res = await editCandidate(candidate._id, values)
            if (res.status === 200) {
                setCandidate({})
                navigate('/admin/recruit-manager')
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

    const handleStatusInter = (value) =>{
        setStatus(value)
    }

    return (

        <Content
            id='candidate-info'
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
                                                   {!hasResult &&  <Button icon={<CloseOutlined />} className={active == 2 ? 'change_status_btn_active' : 'change_status_btn'} onClick={() => handleChange(2)}>
                                                        Reject
                                                    </Button>}
                                                    <Button icon={<EnterOutlined />} className="change_status_btn" onClick={handleRevert}>
                                                       Back
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
                                                                        initialValue={candidate.point ? candidate.point : null}
                                                                    >
                                                                        <Input style={{ width: '100%' }} placeholder="Point"/>
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        label='Result'
                                                                        style={{ width: '49%' }}
                                                                        initialValue={candidate.result ? candidate.result : null}
                                                                    >
                                                                        <Select placeholder='Result' onChange={handleStatusInter}>
                                                                            <Select.Option value={null}></Select.Option>
                                                                            <Select.Option value="pass">Pass</Select.Option>
                                                                        </Select>
                                                                    </Form.Item>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className='flex-between'>
                                                                    <Form.Item
                                                                        label='Point'
                                                                        name='point'
                                                                        style={{ width: '49%' }}
                                                                        initialValue={candidate.point ? candidate.point : null}
                                                                    >
                                                                        <Input style={{ width: '100%' }} placeholder=""/>
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        label='Result'
                                                                        name='result'
                                                                        style={{ width: '49%' }}
                                                                        initialValue={candidate.result ? candidate.result : null}
                                                                    >
                                                                        <Select placeholder='Result' >
                                                                            <Select.Option value="pass">Pass</Select.Option>
                                                                            <Select.Option value="fail">Fail</Select.Option>
                                                                        </Select>
                                                                    </Form.Item>
                                                                </div>
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
                                                            </>
                                                        )}

                                                        <Form.Item className="flex-center">
                                                            {active == 1 ? 
                                                                <Button type="primary" icon={<CheckOutlined/>} onClick={handleConfirm}>
                                                                     Accept
                                                                </Button>
                                                                :
                                                                <Button type="primary" icon={<CloseOutlined />} onClick={handleConfirm}>
                                                                    Reject
                                                                </Button>
                                                            }
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
                                children:
                                    (
                                        <Row className="candidate_cv">
                                            <Col span={24} className="timeline_title">
                                                ATTACHMENT
                                            </Col>
                                            <Col span={24} className="flex-center">
                                                <iframe className=" w-100 vh-100" src={candidate.fileCV[0]}></iframe>
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