import React, { useEffect, useState } from "react";
import { getallJob } from "../../services/job";
import { Empty, Spin, Row, Col, Button} from "antd";
import { TagOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons"
import PopUpInfo from "./popup_info";

const JobList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [jobDetail, setJobDetail] = useState({})
    const token = localStorage.getItem('token')
    

    const getAllJob = async () => {
        try {
            const res = await getallJob();
            if (res.status === 200) {
                setData(res.data.datas.docs)

            }

            setLoading(false)

        } catch (e) {
            console.log("Error: ", e.message);
        }
    }

    useEffect(() => {
        getAllJob()
    }, [])

    const toggleOpen = () => {
        setOpen(!open);
    }


    const showDetail = (job) =>{
        toggleOpen()
        setJobDetail(job)
    }

    const handleApply = () =>{
        if(!token){
            
        }
    }



    return (
        <div className="wrraper flex-center job-wrapper">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            {
                loading ? (
                    <div className="flex-center">
                        <Spin />
                    </div>
                ) : (
                    <>
                        <Row justify="start" className="flex-center job-container">
                            {data.length > 0 ? (<>
                                {
                                    data.map((item, key) => {
                                        return (
                                            <Col span={4} key={key} className="job-item-box">
                                                <h5 className="job-title" onClick={() => showDetail(item)}>{item.name}</h5>
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
                                                    <Button>Apply</Button>
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </>) : (
                                <div className="flex-center h-100">
                                    <Empty />
                                </div>
                            )}
                        </Row>
                    </>

                )

            }
            <div className='air air1'></div>
            <div className='air air2'></div>
            <div className='air air3'></div>
            <div className='air air4'></div>

            {open && (<PopUpInfo job={jobDetail} handleClose={toggleOpen} />) }
        </div>
    )
}

export default JobList