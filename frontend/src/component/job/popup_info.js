import { useScroll } from "@react-spring/web";
import { Modal, Form, Input, Button } from "antd";
import React, { useState } from "react";

const PopUpInfo = ( props ) => {
    const [open, setOpen] = useState(true)
    const { TextArea } = Input;

    return (
        <Modal
            title={`Detailed information of ${props.job.name} jobs`}
            centered
            open={open}
            width={900}
            onOk={() => setOpen(false)}
            onCancel={props.handleClose}
            footer={[
                <Button>
                    Close
                </Button>,
                <Button type="primary">
                    Apply
                </Button>,
            ]}
        >
            <Form
                layout="vertical"
            >
                <Form.Item
                    label='Job name:'
                >
                    <Input value={props.job.name} />
                </Form.Item>
                <Form.Item
                    label='Location:'
                >
                    <Input value={props.job.location} />
                </Form.Item>
                <div className="flex-between">
                    <Form.Item
                        label='Position:'
                        className="w-45"
                    >
                        <Input value={props.job.position} />
                    </Form.Item>
                    <Form.Item
                        label='Salary:'
                        className="w-45"
                    >
                        <Input value={props.job.salary} />
                    </Form.Item>
                </div>
                <Form.Item
                    label='Description:'
                    className="w-100"
                >
                    <TextArea rows={4} size="25" value={props.job.des} />
                </Form.Item>

                <Form.Item
                    label='Job Requirements:'
                    className="w-100"
                >
                    <TextArea rows={4} size="25" value={props.job.req} />
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default PopUpInfo