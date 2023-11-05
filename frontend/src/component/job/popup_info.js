import { Modal, Form, Input, Button } from "antd";
import React, { useState } from "react";

const PopUpInfo = (props) => {
  const { TextArea } = Input;
  const [job] = useState({ ...props.job });
  const [open, setOpen] = useState(true);

  return (
    <Modal
      title={`Detailed information of ${props.job.name} jobs`}
      centered
      open={open}
      width={900}
      onOk={() => setOpen(false)}
      onCancel={props.handleClose}
      footer={[
        <Button key="close" onClick={props.handleClose}>
          Close
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Job name">
          <Input value={job.name} readOnly />
        </Form.Item>
        <Form.Item label="Location">
          <Input value={job.location} readOnly />
        </Form.Item>
        <Form.Item label="Position">
          <Input value={job.position} readOnly />
        </Form.Item>
        <Form.Item label="Salary">
          <Input value={job.salary} readOnly />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea rows={4} value={job.des} readOnly />
        </Form.Item>
        <Form.Item label="Job Requirements">
          <TextArea rows={4} value={job.req} readOnly />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PopUpInfo;
