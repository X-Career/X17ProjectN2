import React from 'react';
import { Button, Layout, theme} from 'antd';
import "./Admin.css"

const { Content } = Layout;


const MailMgr = () => {
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
                        <div className='Tittle'>Mail to Candidate</div>
                        <div>
                        <div className='Profile_Container' style={{width:"80%", margin:"auto"}}>
                                <form style={{width: "100%"}}>
                                    <div className="Tittle_Element">Candidate Email:</div>
                                    <input
                                        className='TE_Input'
                                        type="email"
                                        placeholder="Please enter Candidate Email"
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Candidate Name:</div>
                                    <input
                                        className='TE_Input'
                                        type="text"
                                        placeholder="Please enter Candidate name"
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Intro:</div>
                                    <input
                                        className='TE_Input'
                                        type="text"
                                        placeholder="Please enter Intro."
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Link test:</div>
                                    <input
                                        className='TE_Input'
                                        type="text"
                                        placeholder="Please enter Link Test"
                                    />
                                    <hr/>
                                    <div className="Tittle_Element">Outro:</div>
                                    <input
                                        className='TE_Input'
                                        type="text"
                                        placeholder="Please enter Outro"
                                    />
                                    <hr/>
                                    <Button className="Tittle_Element" style={{height:"40px", marginTop:"12px"}} type='primary' shape='round'>Send Mail</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Content>
    );
}
export default MailMgr



