import { Modal, Form, Input, Button, InputNumber } from "antd";
import React, { useState } from "react";

const PopUpInfo = (props) => {
  const { TextArea } = Input;
  const [job, setJob] = useState({ ...props.job });
  const [open, setOpen] = useState(true);

  const handleApply = () =>{
      props.handleClose()
      props.handleApply()
  }

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
        <Button key="apply" type="primary" onClick={handleApply}>
              Apply
             </Button>
      ]}
    >
      <Form layout="vertical">
        <Form.Item 
        label="Job name">
          <Input
            value={job.name}
            readOnly={true}
          />
        </Form.Item>
        <Form.Item label="Location">
          <Input
            value={job.location}
            readOnly={true}
          />
        </Form.Item>
        <Form.Item label="Position">
          <Input
            value={job.position}
            readOnly={true}
          />
        </Form.Item>
        <Form.Item label="Salary">
          <InputNumber
            name="salary"
            style={{width:'100%'}}
            addonAfter={"USD"}
            max={100000000}
            readOnly={true}
            value={job.salary}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            rows={4}
            value={job.des}
            readOnly={true}
          />
        </Form.Item>
        <Form.Item label="Job Requirements">
          <TextArea
            rows={4}
            value={job.req}
            readOnly={true}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PopUpInfo;
