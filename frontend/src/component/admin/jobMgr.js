import React, { useState } from 'react';
import { Button, Layout, theme, message, Modal } from 'antd';
import "./Admin.css"
import { addJob } from '../../services/job';

const { Content } = Layout;


const JobMgr = () => {
    const [nameofJob, setNameofJob] = useState("")
    const [jobDes, setJobdes] = useState("")
    const [jobReq, setJobreq] = useState("")
    const [location, setLocation] = useState("")
    const [position, setPosition] = useState("")
    const [salary, setSalary] = useState("")
    const [date, setDate] = useState("")
    const [modaOpen, setModaOpen] = useState(false);

    const confirm = async (e) => { 
        e.preventDefault();
        try {
            if (!nameofJob || !jobDes || !jobReq || !location || !position || !salary || !date ) {
                setTimeout(() => {
                    message.error('fail to create job')
                }, 3000);
            } else {
                const Data = {
                    name: nameofJob,
                    des: jobDes,
                    req: jobReq,
                    location: location,
                    position: position,
                    salary: salary,
                    date: date,
                }
                const { emailtoCandidate } = await addJob(Data)
                console.log(emailtoCandidate)
                setModaOpen(false);   
                setTimeout(() => {
                    message.success('Job has been created successfully')
                }, 3000);
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi khi gửi email:", error);
        }
      };
      console.log(confirm)
    const cancel = (e) => {
        console.log(e);
        setModaOpen(false);
        message.error('Cancel completed');
      };



    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >
            <div>
                <div className='Tittle'>Create Job</div>
                <div>
                    <div className='Profile_Container' style={{ width: "80%", margin: "auto" }}>
                        <form style={{ width: "100%" }}>
                            <div className="Tittle_Element">Name of Job:</div>
                            <input
                                className='TE_Input'
                                type="text"
                                value={nameofJob}
                                placeholder="Please enter Name of Job"
                                onChange={(e) => setNameofJob(e.target.value)}
                            />
                            <hr />
                            <div className="Tittle_Element">Job Description:</div>
                            <textarea
                                className='TE_Input'
                                type="text"
                                value={jobDes}
                                placeholder="Please enter Job Description"
                                onChange={(e) => setJobdes(e.target.value)}
                            />
                            <hr />
                            <div className="Tittle_Element">Job Requirement:</div>
                            <textarea
                                className='TE_Input'
                                type="text"
                                value={jobReq}
                                placeholder="Please enter Job Requirement"
                                onChange={(e) => setJobreq(e.target.value)}
                            />
                            <hr />
                            <div className="Tittle_Element">Location:</div>
                            <input
                                className='TE_Input'
                                type="text"
                                value={location}
                                placeholder="Please enter Location"
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <hr />
                            <div className="Tittle_Element">Position:</div>
                            <input
                                className='TE_Input'
                                type="text"
                                value={position}
                                placeholder="Please enter Position"
                                onChange={(e) => setPosition(e.target.value)}
                            />
                            <hr />
                            <div className="Tittle_Element">Salary:</div>
                            <input
                                className='TE_Input'
                                type="number"
                                value={salary}
                                placeholder="Please enter Salary"
                                onChange={(e) => setSalary(e.target.value)}
                            />
                            <hr />
                            <div className="Tittle_Element">Date:</div>
                            <input
                                className='TE_Input'
                                type="Date"
                                value={date}
                                placeholder="Please enter Date"
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <hr />
                            <Button className="Tittle_Element" style={{ height: "40px", marginTop: "12px" }} type='primary' shape='round'
                            onClick={()=>setModaOpen(true)}
                            >Upload New Job</Button>
                            <Modal
                                title="Create New Job"
                                centered
                                open={modaOpen}
                                onOk={confirm}
                                onCancel={cancel}
                                okText="Confirm"
                                cancelText="Cancel">
                                <p>Are you sure to create this job?</p>
                            </Modal>
                        </form>
                    </div>
                </div>
            </div>
        </Content>
    );
}
export default JobMgr



