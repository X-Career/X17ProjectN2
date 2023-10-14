import React from 'react';
import { Button, Layout, theme} from 'antd';
import "./Admin.css"

const { Content } = Layout;


const JobMgr = () => {
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
                        <div className='Profile_Container' style={{width:"80%", margin:"auto"}}>
                                <form style={{width: "100%"}}>
                                    <div className="Tittle_Element">Name of Job:</div>
                                    <input
                                        className='TE_Input'
                                        type="text"
                                        placeholder="Please enter Name of Job"
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Job Description:</div>
                                    <textarea
                                        className='TE_Input'
                                        type="text"
                                        placeholder="Please enter Job Description"
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Job Requirement:</div>
                                    <textarea
                                        className='TE_Input'
                                        type="text"
                                        placeholder="Please enter Job Requirement"
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Location:</div>
                                    <input
                                        className='TE_Input'
                                        type="text"
                                        placeholder="Please enter Location"
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Position:</div>
                                    <input
                                        className='TE_Input'
                                        type="text"
                                        placeholder="Please enter Position"
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Salary:</div>
                                    <input
                                        className='TE_Input'
                                        type="number"
                                        placeholder="Please enter Salary"
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Date:</div>
                                    <input
                                        className='TE_Input'
                                        type="date"
                                        placeholder="Please enter Date"
                                    />
                                    <hr/>
                                    <Button className="Tittle_Element" style={{height:"40px", marginTop:"12px"}} type='primary' shape='round'>Upload New Job</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Content>
    );
}
export default JobMgr



