import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { editJob } from '../../../services/job';

const PopUpEdit = (props) => {
  const { TextArea } = Input;
  const [editing, setEditing] = useState(false);
  const [job, setJob] = useState({ ...props.job });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e, fieldName) => {
    setJob({ ...job, [fieldName]: e.target.value });
  };

  const handleApply = async () => {
    try {
      const response = await editJob(job._id, job);

      if (response.status === 200) {
        console.log("Cập nhật thông tin công việc thành công!");
        window.location.reload();
        window.scrollTo(0, 0);
      } else {
        console.error("Có lỗi xảy ra khi cập nhật thông tin công việc");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu cập nhật: ", error);
    }
  };

  useEffect(() => {
    setEditing(true);
  }, [props.open]);

  return (
    <Modal
      title={`Edit job details: ${props.job.name}`}
      centered
      open={props.open}
      width={900}
      onOk={props.handleClose}
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
        <Form.Item label="Job name">
          <Input
            value={job.name}
            readOnly={!editing}
            onChange={(e) => handleChange(e, "name")}
          />
        </Form.Item>
        <Form.Item label="Location">
          <Input
            value={job.location}
            readOnly={!editing}
            onChange={(e) => handleChange(e, "location")}
          />
        </Form.Item>
        <Form.Item label="Position">
          <Input
            value={job.position}
            readOnly={!editing}
            onChange={(e) => handleChange(e, "position")}
          />
        </Form.Item>
        <Form.Item label="Salary">
          <Input
            value={job.salary}
            readOnly={!editing}
            onChange={(e) => handleChange(e, "salary")}
          />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            rows={4}
            value={job.des}
            readOnly={!editing}
            onChange={(e) => handleChange(e, "des")}
          />
        </Form.Item>
        <Form.Item label="Job Requirements">
          <TextArea
            rows={4}
            value={job.req}
            readOnly={!editing}
            onChange={(e) => handleChange(e, "req")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PopUpEdit;
