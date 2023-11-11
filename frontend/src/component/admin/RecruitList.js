import React, { useContext, useEffect, useState } from "react";
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
  message,
} from "antd";
import { addRecruitMgr, getallRecruitMgr } from "../../services/recruitMgr";
import dayjs from "dayjs";
import RecruitContext from "../../context/recruit";
const RecruitList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recruitsPerPage = 3;
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [selectedRecruit, setSelectedRecruit] = useState(null);
  const [form] = Form.useForm();
  const [errors, setErrors] = useState([]);
  const [recruits, setRecruits] = useState([]);
  const {setRecruit } = useContext(RecruitContext)

  // const startIndex = (currentPage - 1) * recruitsPerPage;
  // const endIndex = startIndex + recruitsPerPage;
  // const recruitsOnCurrentPage = recruits.slice(startIndex, endIndex);

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
        const { nameRecruit, datetoStart, datetoEnd } = values;
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
            nameRecruit,
            datetoStart,
            datetoEnd,
          };

          newRecruit['datetoStart'] = dayjs(newRecruit['datetoStart']).format('YYYY-MM-DD');
          newRecruit['datetoEnd'] = dayjs(newRecruit['datetoEnd']).format('YYYY-MM-DD');
          
          handleAddNewRecruit(newRecruit)
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

  const handleAddNewRecruit = async (newRecruit) =>{
    try {
      const res = await addRecruitMgr(newRecruit);
      if(res.status === 200){
        message.success(res.data.message);
        getAllRecruit();
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
  
  const getAllRecruit = async() =>{
    try {
      const res = await getallRecruitMgr();
      setRecruits(res.data.datas)
      setRecruit(res.data.datas[0]._id)
      setSelectedRecruit(res.data.datas[0]._id)
    } catch (error) {
      console.log('Error', error.message);
    }
  }

  useEffect(() =>{
    getAllRecruit()
  }, [])

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

  const showDetailModal = (id) => {
    setSelectedRecruit(id);
    setRecruit(id)
  };

  const handleCancel = () =>{
    setCreateModalVisible(false);
    form.resetFields();
    setErrors([]);
  }
  

  return (
    <div>
      <Row justify="end" style={{ marginBottom: 8 }}>
        <Button type="primary" onClick={handleCreateNewRecruit}>
          New recruit
        </Button>
      </Row>
      <Row gutter={16} style={{ marginBottom: 8 }}>
        {recruits.map((recruit) => (
          <Col span={8} key={recruit._id}>
            <div style={{ position: "relative" }}>
              <Card
                style={{ border: `${selectedRecruit === recruit._id ? '1px solid #e8d207' : '1px solid #efefef'} `}}
                hoverable
                title={<div style={cardTitleClass}>{recruit.nameRecruit}</div>}
                size="small"
                onClick={() => showDetailModal(recruit._id)}
              >
                <p>
                  Start date:{" "}
                  {new Date(recruit.datetoStart).toISOString().slice(0, 10)}
                </p>
                <p>
                  Startr date:{" "}
                  {new Date(recruit.datetoEnd).toISOString().slice(0, 10)}
                </p>
              </Card>
              <Button
                type="danger"
                onClick={() => handleDeleteRecruit(recruit.id)}
                style={{ position: "absolute", top: 4, right: 0 }}
              >
                Detail
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
        title="Add new recruit"
        open={isCreateModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close"  onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="apply" type="primary" onClick={handleCreateRecruit}>
            Create
          </Button>
        ]}
    
        width="45%"
      >
        <Form 
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="nameRecruit"
            label="Name of recruit"
            rules={[
              {
                required: true,
                message: "Please enter name of recruit",
              },
            ]}
          >
            <Input placeholder="Name of recruit"/>
          </Form.Item>
         <div className="flex-between w-100">
            <Form.Item
              name="datetoStart"
              label="Start date"
              style={{width: '49%'}}
              rules={[
                {
                  required: true,
                  message: "Please enter start date",
                },
              ]}
            >
              <DatePicker style={{width: '100%'}}/>
            </Form.Item>
            <Form.Item
              name="datetoEnd"
              label="End date"
              style={{ width: '49%' }}
              rules={[
                {
                  required: true,
                  message: "Please enter end date",
                },
              ]}
            >
              <DatePicker 
              style={{ width: '100%' }}
               />
            </Form.Item>
         </div>
          {/* <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea rows={4} placeholder="Description"/>
          </Form.Item> */}
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
      {/* <Modal
        title="Detail infomation of the recruit"
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
      </Modal> */}
    </div>
  );
};

export default RecruitList;
