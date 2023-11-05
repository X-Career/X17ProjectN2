import React, { useEffect, useState } from "react";
import { Button, Layout, theme, message, Modal, Table, Row } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PopupCreate from "./PopupCreate";
import { getallJob, deleteJob } from "../../../services/job";
import PopUpEdit from "./PopUpEdit";
const { Content } = Layout;

const JobMgr = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const getAllJob = async () => {
    setLoading(true);
    try {
      const res = await getallJob();
      setData(res.data.datas.docs);
      setLoading(false);
    } catch (e) {
      console.log("Error: ", e.message);
    }
  };

  useEffect(() => {
    getAllJob();
  }, []);

  const handleDelete = async (id) => {
    try {
      Modal.confirm({
        title: "Xác nhận xóa",
        content: "Bạn có chắc chắn muốn xóa công việc này?",
        okText: "Xác nhận",
        okType: "danger",
        cancelText: "Hủy",
        onOk: async () => {
          try {
            const response = await deleteJob(id);
            if (response.status === 200) {
              console.log("Xóa công việc thành công!");
              getAllJob();
            } else {
              console.error("Có lỗi xảy ra khi xóa công việc");
            }
          } catch (error) {
            console.error("Lỗi khi gửi yêu cầu xóa công việc: ", error);
          }
        },
      });
    } catch (error) {
      console.error("Lỗi khi xóa công việc: ", error);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: " name",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Requirement",
      dataIndex: "req",
      key: "requirement",
      render: (req) => <span className="text-column">{req}</span>,
    },
    {
      title: "Description",
      dataIndex: "des",
      key: "description",
      render: (des) => <span className="text-column">{des}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <div style={{ gap: "12px", display: "flex" }}>
            <div
              onClick={() => setRecordToEdit(record)}
              style={{ color: "#1677ff", cursor: "pointer" }}
            >
              <EditOutlined />
            </div>
            <div
              onClick={() => handleDelete(record._id)}
              style={{ color: "#e8d207", cursor: "pointer" }}
            >
              <DeleteOutlined />
            </div>
          </div>
        </span>
      ),
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: "80vh",
        background: colorBgContainer,
      }}
    >
      <div>
        <Row justify="space-between" style={{ marginBottom: "15px" }}>
          <h2>JOB LIST</h2>
          <Button onClick={toggleOpen} icon={<PlusCircleOutlined />}>
            Create
          </Button>
        </Row>
        <Table
          dataSource={data}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 10, total: totalPages }}
        />

        {open && <PopupCreate handleClose={toggleOpen} refresh={getAllJob} />}
        {recordToEdit && (
          <PopUpEdit
            job={recordToEdit}
            open={true}
            handleClose={() => setRecordToEdit(null)}
          />
        )}
      </div>
    </Content>
  );
};
export default JobMgr;
