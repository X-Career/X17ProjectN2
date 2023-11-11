import { Modal, Form, Select, Input, Button, InputNumber } from "antd";
import React, { useState, useEffect } from "react";
import { addJob } from '../../../services/job';
import { getallRecruitMgr } from '../../../services/recruitMgr';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useForm } from "antd/es/form/Form";
import { showMessage } from "../../../helper/showMessage";

const PopupCreate = (props) =>{
    const [open, setOpen] = useState(true);
    const { TextArea } = Input;
    const { confirm } = Modal;
    const [form] = useForm();


    const [recruitMgr, setRecruitMgr] = useState([]);
    useEffect(() => {
        getRecruit();
    }, [])

    const getRecruit = async () => {
        const { data } = await getallRecruitMgr();
        setRecruitMgr(data.datas);
    };

    const showConfirm = () => {
        confirm({
            centered: true,
            title: 'Do you want to exit?',
            icon: <ExclamationCircleFilled />,
            content: 'Your data will be reset!',
            onOk() {
                props.handleClose()
            }
        });
    };
    console.log(recruitMgr)

    const handleCreate = async () =>{
        try{
            const formData = await form.validateFields();
            let values = Object.entries(formData).reduce((acc, [key, value]) => {
                if (value !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {});
            const res = await addJob(values)
            showMessage(res.status, res.data.message)
            if(res.status === 200 ){
                setOpen(false)
                props.refresh()
            }
        }catch(e){
            console.log("Error: ", e.message);
        }
    }

    return (
        <Modal 
            title="Create job"
            width={900}
            open={open}
            onCancel={showConfirm}
            footer={false}
            centered
        >

            <Form
                style={{ width: "100%" }}
                layout="vertical"
                form={form}
                className="form_create_job"
            >
                <Form.Item
                    label="Select recruit management"
                    name="recruitId"
                    rules={[{ required: true, message: "Please select recruit management!" }]}
                >
                    <Select
                        placeholder="Select Recruitment"
                    >
                        <Select.Option
                            value="other"
                            key="other"
                        >
                            Other
                        </Select.Option>
                        <>
                            {
                                recruitMgr.map((list, key) => (
                                    <Select.Option
                                        key={key}
                                        value={list._id}
                                    >
                                        <span>{list.nameRecruit}</span>
                                    </Select.Option>
                                ))
                            }
                        </>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Name of job"
                    rules={[{ required: true, message: "Please enter name of job!" }]}
                >
                    <Input
                        placeholder="Name of Job"
                    />

                </Form.Item>
                <Form.Item
                    name="des"
                    label="Description"
                    rules={[{ required: true, message: "Please enter description of job!" }]}
                >
                    <TextArea rows={4} size="25" placeholder="Description"/>
                </Form.Item>
                <Form.Item
                    name="req"
                    label="Requirement"
                    rules={[{ required: true, message: "Please enter description of job!" }]}
                >
                    <TextArea rows={4} size="25" placeholder="Requirement" />

                </Form.Item>

                <Form.Item
                    name="location"
                    label="Location"
                    rules={[{ required: true, message: "Please enter location of company!" }]}
                >
                    <Input
                        placeholder="Location"
                    />

                </Form.Item>

                <Form.Item
                    name="position"
                    label="Position"
                    rules={[{ required: true, message: "Please enter position of job!" }]}
                >
                    <Input
                        placeholder="Position"
                    />

                </Form.Item>

                <Form.Item
                    name="salary"
                    label="Salary"
                    rules={[{ required: true, message: "Please enter salary of job!" }]}
                >
                    <InputNumber
                        name="salary"
                        addonAfter={"USD"}
                        max={100000000}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item className="flex-end">
                    <Button onClick={showConfirm} style={{marginRight: '.5rem'}}>
                        Close
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleCreate}>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default PopupCreate