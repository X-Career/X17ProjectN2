import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Pagination,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Alert,
} from "antd";

const RecruitList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recruitsPerPage = 3;
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedRecruit, setSelectedRecruit] = useState(null);
  const [form] = Form.useForm();
  const [errors, setErrors] = useState([]);
  const [recruits, setRecruits] = useState([
    {
      id: 1,
      nameRecruit: "Đợt tuyển dụng 1",
      datetoStart: "2023-10-01",
      datetoEnd: "2023-10-10",
      description: "Mô tả cho đợt tuyển dụng 1",
    },
    {
      id: 2,
      nameRecruit: "Đợt tuyển dụng 2",
      datetoStart: "2023-10-15",
      datetoEnd: "2023-10-25",
      description: "Mô tả cho đợt tuyển dụng 2",
    },
    {
      id: 3,
      nameRecruit: "Đợt tuyển dụng 3",
      datetoStart: "2023-10-30",
      datetoEnd: "2023-11-05",
      description: "Mô tả cho đợt tuyển dụng 3",
    },
    {
      id: 4,
      nameRecruit: "Đợt tuyển dụng 4",
      datetoStart: "2023-10-30",
      datetoEnd: "2023-11-05",
      description: "Mô tả cho đợt tuyển dụng 4",
    },
  ]);

  const startIndex = (currentPage - 1) * recruitsPerPage;
  const endIndex = startIndex + recruitsPerPage;
  const recruitsOnCurrentPage = recruits.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateNewRecruit = () => {
    setCreateModalVisible(true);
  };

  const handleCreateRecruit = () => {
    form
      .validateFields()
      .then((values) => {
        const { nameRecruit, datetoStart, datetoEnd, description } = values;
        const newErrors = [];
  
        if (isDuplicateName(nameRecruit)) {
          newErrors.push(
            "Tên đợt tuyển dụng đã tồn tại. Vui lòng chọn tên khác."
          );
        }
        if (datetoStart.isAfter(datetoEnd)) {
          newErrors.push("Ngày bắt đầu phải trước ngày kết thúc.");
        }
  
        if (newErrors.length === 0) {
          const newRecruit = {
            id: recruits.length + 1,
            nameRecruit,
            datetoStart,
            datetoEnd,
            description,
          };
          setRecruits([...recruits, newRecruit]);
          setCreateModalVisible(false);
          form.resetFields();
        } else {
          setErrors(newErrors);
        }
      })
      .catch((error) => {
        if (error.message !== "No field in form.") {
          console.error(error);
        }
      });
  };
  

  const isDuplicateName = (name) => {
    return recruits.some((recruit) => recruit.nameRecruit === name);
  };

  const cardTitleClass = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "400px",
  };

  const handleDeleteRecruit = (recruitId) => {
    Modal.confirm({
      title: "Xác nhận xóa đợt tuyển dụng",
      content: "Bạn có chắc chắn muốn xóa đợt tuyển dụng này?",
      onOk: () => {
        const updatedRecruits = recruits.filter(
          (recruit) => recruit.id !== recruitId
        );
        setRecruits(updatedRecruits);
      },
      onCancel: () => {},
    });
  };

  const showDetailModal = (recruit) => {
    setSelectedRecruit(recruit);
    setDetailModalVisible(true);
  };

  

  return (
    <div>
      <Row justify={"space-between"} style={{ marginBottom: 8 }}>
        <h2>Danh sách đợt tuyển dụng</h2>
        <Button type="primary" onClick={handleCreateNewRecruit}>
          Tạo đợt tuyển dụng mới
        </Button>
      </Row>
      <Row gutter={16} style={{ marginBottom: 8 }}>
        {recruitsOnCurrentPage.map((recruit) => (
          <Col span={8} key={recruit.id}>
            <div style={{ position: "relative" }}>
              <Card
                hoverable
                title={<div style={cardTitleClass}>{recruit.nameRecruit}</div>}
                size="small"
                onClick={() => showDetailModal(recruit)}
              >
                <p>
                  Thời gian bắt đầu:{" "}
                  {new Date(recruit.datetoStart).toISOString().slice(0, 10)}
                </p>
                <p>
                  Thời gian kết thúc:{" "}
                  {new Date(recruit.datetoEnd).toISOString().slice(0, 10)}
                </p>
              </Card>
              <Button
                type="danger"
                onClick={() => handleDeleteRecruit(recruit.id)}
                style={{ position: "absolute", top: 4, right: 0 }}
              >
                Xóa
              </Button>
            </div>
          </Col>
        ))}
      </Row>
      <Row justify="space-between" style={{ marginBottom: 8 }}>
        <Col />
        <Pagination
          current={currentPage}
          pageSize={recruitsPerPage}
          total={recruits.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </Row>

      <Modal
        title="Tạo đợt tuyển dụng mới"
        open={isCreateModalVisible}
        onOk={handleCreateRecruit}
        onCancel={() => {
          setCreateModalVisible(false);
          form.resetFields();
          setErrors([]);
        }}
        width="60%"
      >
        <Form form={form}>
          <Form.Item
            name="nameRecruit"
            label="Tên đợt tuyển dụng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đợt tuyển dụng",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="datetoStart"
            label="Ngày bắt đầu"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày bắt đầu",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="datetoEnd"
            label="Ngày kết thúc"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày kết thúc",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
        {errors.length > 0 && (
          <div>
            {errors.map((error, index) => (
              <div key={index} style={{ marginBottom: "5px" }}>
                <Alert message={error} type="error" showIcon />
              </div>
            ))}
          </div>
        )}
      </Modal>
      <Modal
        title="Thông tin chi tiết đợt tuyển dụng"
        open={isDetailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        bodyStyle={{ minHeight: 300 }}
      >
        {selectedRecruit && (
          <div>
            <p>Tên đợt tuyển dụng: {selectedRecruit.nameRecruit}</p>
            <p>
              Thời gian bắt đầu:{" "}
              {new Date(selectedRecruit.datetoStart).toISOString().slice(0, 10)}
            </p>
            <p>
              Thời gian kết thúc:{" "}
              {new Date(selectedRecruit.datetoEnd).toISOString().slice(0, 10)}
            </p>
            <p>Mô tả: {selectedRecruit.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecruitList;
