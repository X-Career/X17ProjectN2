import { Modal, Form, Input, Button, InputNumber, DatePicker, message } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { editCandidate } from "../../services/candidate";
import { useForm } from "antd/es/form/Form";

const PopupDetail = (props) => {
    const { TextArea } = Input;
    const [candidate, setCandidate] = useState({ ...props.candidate });
    const [open, setOpen] = useState(true);
    const [form] = useForm()

    const handleApply = async() => {
        try{
            const formData = await form.validateFields();
            let values = Object.entries(formData).reduce((acc, [key, value]) => {
                if (value !== '') {
                    acc[key] = value;
                }
                if (key === 'datetoInter' || key === 'datetoGetjob') {
                    if (value) {
                        acc[key] = dayjs(value).format('YYYY-MM-DD HH:mm');
                    }
                }
                acc['userId'] = props.userId
                acc['recruitId'] = candidate.recruitId
                acc['fileCV'] = candidate.fileCV[0]
                acc['jobId'] = candidate.jobId._id
                return acc;
            }, {});
            const res = await editCandidate(values)
            if(res.status == 200){
                props.handleClose()
                message.success('Your suggest sent to HR')
            }else{
                message.error('Opps, somwthing went wrong, check again!')
            }

        }catch(e){

        }
    }



    return (
        <Modal
            title={`Detailed information of ${candidate.jobId.name} jobs of history`}
            centered
            open={open}
            width={900}
            onOk={() => setOpen(false)}
            onCancel={props.handleClose}
            footer={() =>{
                if (candidate.status == 'Interviewing'){
                    return [
                        <Button key="close" onClick={props.handleClose}>
                            Close
                        </Button>,
                        <Button key="apply" type="primary" onClick={handleApply}>
                            Suggest
                        </Button>
                    ]
                }else{
                    return <Button key="close" onClick={props.handleClose}>
                        Close
                    </Button>
                }
            }}

        >
            <Form 
            layout="vertical"
            form={form}
            >
                <Form.Item
                    label="Job name">
                    <Input
                        value={candidate.jobId.name}
                        readOnly={true}
                    />
                </Form.Item>
                <Form.Item
                    label="Location"
                >
                    <Input
                        value={candidate.jobId.location}
                        readOnly={true}
                    />
                </Form.Item>
                <div  className="flex-between">
                    <Form.Item 
                    label="Position"
                        style={{ width: '49%' }}
                    >
                        <Input
                            value={candidate.jobId.position}
                            readOnly={true}
                        />
                    </Form.Item>
                    <Form.Item 
                    label="Salary"
                        style={{ width: '49%' }}
                    >
                        <InputNumber
                            name="salary"
                            style={{ width: '100%' }}
                            addonAfter={"USD"}
                            max={100000000}
                            readOnly={true}
                            value={candidate.jobId.salary}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Status"
                >
                    <Input
                        value={candidate.status}
                        readOnly={true}
                    />
                </Form.Item>
                {candidate.status == 'Interviewing' && (
                    <div className="flex-between">
                        <Form.Item
                            label='Date to inter'
                            name='datetoInter'
                            style={{ width: '100%' }}
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
                    </div>
                )}
                {candidate.status == 'Rejected' && (
                        <Form.Item
                            name="denyReason"
                            label="Deny reason"
                        >
                            <TextArea
                                rows={4}
                                readOnly={true}
                            />
                        </Form.Item>
                )}
                {candidate.status == 'Testing' && (
                    <div className="flex-between">
                        <Form.Item
                            label="Point"
                            style={{ width: '49%' }}
                        >
                            <Input
                                readOnly={true}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Result"
                            style={{ width: '49%' }}
                        >
                            <Input
                                readOnly={true}
                            />
                        </Form.Item>
                    </div>
                )}
                <Form.Item label="Description">
                    <TextArea
                        rows={4}
                        value={candidate.jobId.des}
                        readOnly={true}
                    />
                </Form.Item>
                <Form.Item label="Job Requirements">
                    <TextArea
                        rows={4}
                        value={candidate.jobId.req}
                        readOnly={true}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PopupDetail;
