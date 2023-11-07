import { Modal, Form, Input, Button, InputNumber } from "antd";
import React, { useState } from "react";
import { deleteJob, editJob } from "../../services/job";

const PopUpInfo = (props) => {
  const { TextArea } = Input;
  const [editing, setEditing] = useState(false);
  // const [job, setJob] = useState({ ...props.job });
  const [open, setOpen] = useState(true);

  // const isAdmin = props.user && props.user.role === "admin";

  // const handleEdit = () => {
  //   setEditing(true);
  // };

  // const handleSave = () => {
  //   setEditing(false);
  // };

  // const handleChange = (e, fieldName) => {
  //   setJob({ ...job, [fieldName]: e.target.value });
  // };

  // const handleApply = async () => {
  //   const updatedJob = job;

  //   try {
  //     const response = await editJob(updatedJob._id, updatedJob);

  //     if (response.status === 200) {
  //       console.log("Cập nhật thông tin công việc thành công!");
  //       window.location.reload();
  //       window.scrollTo(0, 0);
  //     } else {
  //       console.error("Có lỗi xảy ra khi cập nhật thông tin công việc");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gửi yêu cầu cập nhật: ", error);
  //   }
  // };

  // const handleDelete = async () => {
  //   const jobID = job._id;

  //   try {
  //     const response = await deleteJob(jobID);

  //     if (response.status === 200) {
  //       console.log("Xóa công việc thành công!");
  //       setOpen(false);
  //     } else {
  //       console.error("Có lỗi xảy ra khi xóa công việc");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gửi yêu cầu xóa công việc: ", error);
  //   }
  // };

  // const showConfirm = () => {
  //   Modal.confirm({
  //     title: "Xác nhận xóa công việc",
  //     content: "Bạn có chắc chắn muốn xóa công việc này?",
  //     okText: "Xác nhận",
  //     okType: "danger",
  //     cancelText: "Hủy",
  //     onOk() {
  //       handleDelete();
  //     },
  //   });
  // };

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
        // isAdmin && (
        //   <>
        //     <Button key="delete" type="primary" danger onClick={showConfirm}>
        //       Delete
        //     </Button>
        //     {isAdmin &&
        //       (editing ? (
        //         <Button key="save" type="primary" onClick={handleSave}>
        //           Save
        //         </Button>
        //       ) : (
        //         <Button key="edit" type="primary" onClick={handleEdit}>
        //           Edit
        //         </Button>
        //       ))}
        //     {isAdmin && (
        //       <Button key="apply" type="primary" onClick={handleApply}>
        //         Apply
        //       </Button>
        //     )}
        //   </>
        // ),
      ]}
    >
      <Form layout="vertical">
        <Form.Item 
        label="Job name">
          <Input
            value={job.name}
            readOnly={!editing}
            // onChange={(e) => handleChange(e, "name")}
          />
        </Form.Item>
        <Form.Item label="Location">
          <Input
            value={job.location}
            readOnly={!editing}
            // onChange={(e) => handleChange(e, "location")}
          />
        </Form.Item>
        <Form.Item label="Position">
          <Input
            value={job.position}
            readOnly={!editing}
            // onChange={(e) => handleChange(e, "position")}
          />
        </Form.Item>
        <Form.Item label="Salary">
          <InputNumber
            name="salary"
            style={{width:'100%'}}
            addonAfter={"USD"}
            max={100000000}
            value={job.salary}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
          {/* <Input
            value={job.salary}
            readOnly={!editing}
            onChange={(e) => handleChange(e, "salary")}
          /> */}
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            rows={4}
            value={job.des}
            readOnly={!editing}
            // onChange={(e) => handleChange(e, "des")}
          />
        </Form.Item>
        <Form.Item label="Job Requirements">
          <TextArea
            rows={4}
            value={job.req}
            readOnly={!editing}
            // onChange={(e) => handleChange(e, "req")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PopUpInfo;
