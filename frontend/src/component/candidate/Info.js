import React, { useContext, useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { CandidateContext } from "../../context/candidate";
import { Row, Col, Timeline, Form, Input, InputNumber, Select, Button, DatePicker, message } from "antd";
import './candidate.css'
import { useForm } from "antd/es/form/Form";
import { CheckOutlined, CloseOutlined, EnterOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { editCandidate } from "../../services/candidate";

const Info = () => {
    const { candidate } = useContext(CandidateContext)
    const [isAccept, setAccept] = useState(false);
    const [change, setChange] = useState(false);
    const [active, setActive] = useState()
    const [hasRevert, setHasRevert] = useState(false)
    const [form] = useForm();
    const { TextArea } = Input;

    const handleChange = (value) => {
        if(value == 1){
            setAccept(true)
            setActive(1)
            form.setFieldsValue({status: 'Testing'})
        }else{
            setAccept(false)
            setActive(0)
            form.setFieldsValue({ status: 'Rejected' })
        }
        setChange(true)
    }

    const handleRevert = () => {
        setChange(false)
    }

    useEffect(() => {
        if(candidate.status == 'Testing'){
            setAccept(true)
            setActive(1)
            setChange(true)
            form.setFieldsValue({ status: 'Testing' })
            form.setFieldsValue({ point: candidate.point })
            form.setFieldsValue({ result: candidate.result })
            setHasRevert(true)
        } else if (candidate.status == 'Rejected'){
            setAccept(false)
            setActive(0)
            setChange(true)
            setHasRevert(true)
            form.setFieldsValue({ denyReason: candidate.denyReason })
            form.setFieldsValue({ status: 'Rejected' })
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
                   if(value){
                       acc[key] = dayjs(value).format('YYYY-MM-DD');
                   }
                    acc['denyReason'] = null;
                }
                if (key === 'denyReason'){
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
            const res = await editCandidate(candidate._id,values)
            if(res.status === 200){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }

        } catch (error) {
            console.log("Error:", error.message);
        }
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
                                                    <Button icon={<CheckOutlined />} className={active == 1 ? 'change_status_btn_active' : 'change_status_btn'} onClick={() => handleChange(1)}>
                                                        Accept
                                                    </Button>
                                                
                                                    {!hasRevert && 
                                                    (<>
                                                        <Button icon={<CloseOutlined />} className={active == 0 ? 'change_status_btn_active' : 'change_status_btn'} onClick={() => handleChange(0)}>
                                                            Reject
                                                        </Button>
                                                        <Button icon={<EnterOutlined />} className="change_status_btn" onClick={handleRevert}>
                                                            Revert
                                                        </Button>
                                                    </>)}
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
                                            {change ? (
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
                                                            <Input value='' readOnly={true}/> 
                                                        </Form.Item>
                                                        {isAccept ? (
                                                            <>
                                                                <Form.Item
                                                                    label='Date to inter'
                                                                    name='datetoInter'
                                                                    style={{ width: '100%' }}
                                                                    rules={[{ required: true, message: "Please enter date to inter of job!" }]}
                                                                    initialValue={candidate.datetoInter ? dayjs(candidate.datetoInter) : null}
                                                                >
                                                                    <DatePicker format='DD-MM-YYYY'/>
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label='Date to get job'
                                                                    name='datetoGetjob'
                                                                    style={{ width: '100%' }} 
                                                                    initialValue={candidate.datetoGetjob ? dayjs(candidate.datetoGetjob) : null}
                                                                >
                                                                    <DatePicker format='DD-MM-YYYY' />
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
                                                <div className="column-center" style={{height: '400px', marginTop: '-5rem'}}>
                                                    <img style={{ width: '350px' }} src="../images/waitting.png" />
                                                        {candidate.userId.gender == 'male' ? (<p style={{ marginTop: '-3rem' }}>Oops, he is waitting your reply!</p>) : 
                                                        (<p style={{ marginTop: '-3rem', color: 'white' }}>Oops, she is waitting your reply!</p>)}
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