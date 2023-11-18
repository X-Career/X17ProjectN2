import React, { useContext, useEffect } from "react"
import { useState } from "react"
import { Empty, Spin, Row, Col, Button, Select, message } from "antd";
import { TagOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import { UserContext } from "../../context/user";
import { getMyHistory } from "../../services/candidate";
import PopupDetail from "./PopupDetail";
import { useParams } from "react-router-dom";

const MyApply = () => {
    const { user } = useContext(UserContext)
    const [apply, setApply] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [candidate, setCandidate] = useState({})
    const { userId } = useParams()

    const getHistoryApply = async () => {
        setLoading(true)
        try {
            const res = await getMyHistory(userId);
            if (res.status === 200) {
                setApply(res.data.data)
                setLoading(false)
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }

        } catch (error) {
            console.log("Error:", error.message);
        }
    }

    useEffect(() => {
        getHistoryApply()
    }, [])


    const showDetail = (item) => {
        toggleOpen()
        setCandidate(item)
    }

    const toggleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className="wrraper flex-center job-wrapper">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <Row justify={'center'} className="w-100">
                {apply.length > 0 ? (
                    <>
                        {apply.map((item, key) => {
                            return <Col span={4} key={key} className="job-item-box">
                                <h5
                                    className="job-title"
                                    onClick={() => showDetail(item)}
                                >
                                    {item.jobId.name}
                                </h5>
                                <span>
                                    <HomeOutlined />
                                    Location: {item.jobId.location}
                                </span>
                                <div className="flex-between w-100 job-content">
                                    <span className="flex-start">
                                        <UserOutlined />
                                        <p>Position: {item.jobId.position}</p>
                                    </span>
                                    <span className="flex-start">
                                        <TagOutlined />
                                        <p>Salary: {item.jobId.salary}</p>
                                    </span>
                                </div>
                                <div className="w-100 flex-center">
                                    <Button onClick={() => showDetail(item)}>
                                        Detail
                                    </Button>
                                </div>
                            </Col>
                        })
                    }
                    </>
                ) : (
                    <Empty/>
                ) }
            </Row>
            {open && <PopupDetail handleClose={toggleOpen} candidate={candidate} userId={userId}/>}
        </div>
    )
}

export default MyApply