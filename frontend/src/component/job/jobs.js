import React, { useContext, useEffect, useState } from "react";
import { Empty, Spin, Row, Col, Button, Select } from "antd";
import { TagOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import PopUpInfo from "./popup_info";
import { getallRecruitMgr } from "../../services/recruitMgr";
import { getJobsOfRecruit } from "../../services/job";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import Apply from "./apply";
const dateFormat = "DD/MM/YYYY";



const JobList = () => {
  const { user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(true);
  const [crrRecurit, setCrrRecurit] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobDetail, setJobDetail] = useState({});
  const [recruit, setRecurit] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobLoad, setJobLoad] = useState(false);
  const token = localStorage.getItem("token");
  const [applyOpen, setApplyOpen] = useState(false)
  const navigate = useNavigate();

  const getJob = async (id) => {
    setJobLoad(true);
    try {
      const res = await getJobsOfRecruit(id, user._id);
      if (res.status === 200) {
        setJobs(res.data.data);
      }
      setJobLoad(false);
    } catch (e) {
      console.log("Error: ", e.message);
    }
  };

  const getRecurit = async () => {
    try {
      const res = await getallRecruitMgr();
      if (res.status === 200) {
        setRecurit(res.data.datas);
        setCrrRecurit(res.data.datas[0]._id)
      }
      setLoading(false);
    } catch (e) {
      console.log("Error: ", e.message);
    }
  };

  useEffect(() => {
    getRecurit();
  }, []);


  const toggleOpen = () => {
    setOpen(!open);
  };

  const showDetail = (job) => {
    setJobDetail(job);
    toggleOpen();
  };

  const handleApply = (job) => {
    if (!token) {
      navigate("/login");
    } else {
      setJobDetail(job);
      toggleApply()
    }
  };

  const toggleApply = () =>{
    setApplyOpen(!applyOpen)
  }

  const handleChangeRecruit = (value) => {
    setCrrRecurit(value);
  };

  useEffect(() => {
    getJob(crrRecurit);
  }, [crrRecurit]);

  return (
    <div className="wrraper flex-center job-wrapper">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Row className="w-100 flex-center absolute top-15">
        {loading ? (
          <></>
        ) : (
          <Select
            className="w-50"
            defaultValue={recruit[0]._id}
            onChange={handleChangeRecruit}
          >
            <>
              {recruit.length > 0 ? (
                recruit.map((item, key) => {
                  return (
                    <Select.Option key={key} value={item._id}>
                      {item.nameRecruit} - From:{" "}
                      {dayjs(item.datetoStart).format(dateFormat)} - To:{" "}
                      {dayjs(item.datetoEnd).format(dateFormat)}
                    </Select.Option>
                  );
                })
              ) : (
                <></>
              )}
            </>
          </Select>
        )}
      </Row>
      {jobLoad ? (
        <div className="flex-center">
          <Spin />
        </div>
      ) : (
        <>
          <Row justify="start" className="flex-center job-container">
            {jobs.length > 0 && (
              <>
                {jobs.map((item, key) => {
                  return (
                    <Col span={4} key={key} className="job-item-box">
                      <h5
                        className="job-title"
                        onClick={() => showDetail(item)}
                      >
                        {item.name}
                      </h5>
                      <span>
                        <HomeOutlined />
                        Location: {item.location}
                      </span>
                      <div className="flex-between w-100 job-content">
                        <span className="flex-start">
                          <UserOutlined />
                          <p>Position: {item.position}</p>
                        </span>
                        <span className="flex-start">
                          <TagOutlined />
                          <p>Salary: {item.salary}</p>
                        </span>
                      </div>
                      <div className="w-100 flex-center">
                        <Button onClick={() => handleApply(item)}>
                          Apply
                        </Button>
                      </div>
                    </Col>
                  );
                })}
              </>
            )}
          </Row>
        </>
      )}
      <div className="air air1"></div>
      <div className="air air2"></div>
      <div className="air air3"></div>
      <div className="air air4"></div>

      {open && (
        <PopUpInfo
          user={user}
          job={jobDetail}
          handleClose={toggleOpen}
          handleApply={toggleApply}
        />
      )}

      {applyOpen && (
        <Apply job={jobDetail} recruit={crrRecurit} handleClose={toggleApply} refresh={getJobsOfRecruit}/>
      )}
    </div>
  );
};

export default JobList;