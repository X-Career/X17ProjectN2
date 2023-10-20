import React, { useState } from 'react';
import { Button, Layout, theme, message, Modal} from 'antd';
import "./Admin.css"
import { sendMail } from "../../services/mail"


const { Content } = Layout;


const MailMgr = () => {
    const [emailCand, setEmailCand] = useState("")
    const [nameCand, setNameCand] = useState("")
    const [intro, setIntro] = useState("Please complete this test")
    const [link, setLink] = useState("")
    const [outro, setOutro] = useState("Thanks for doing this test")
    const [modaOpen, setModaOpen] = useState(false);



 
    const confirm = async (e) => { 
        e.preventDefault();
        try {
            if (!emailCand || !nameCand || !intro || !link || !outro) {
                setTimeout(() => {
                    message.error('fail to send mail')
                }, 3000);
            } else {
                const Data = {
                    userEmail: emailCand,
                    candidateName: nameCand,
                    intro: intro,
                    linkTest: link,
                    outro: outro,
                }
                const { emailtoCandidate } = await sendMail(Data)
                console.log(emailtoCandidate)
                setModaOpen(false);   
                setTimeout(() => {
                    message.success('Mail has been sent')
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
        message.error('Rejected send');
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
            <div style={{height:"100vh"}}>
                <div className='Tittle'>Mail to Candidate</div>
                <div>
                    <div className='Profile_Container' style={{ width: "80%", margin: "auto" }}>
                        <form style={{ width: "100%" }}>
                            <div className="Tittle_Element">Candidate Email:</div>
                            <input
                                className='TE_Input'
                                type="email"
                                value={emailCand}
                                placeholder="Please enter Candidate Email"
                                onChange={(e) => setEmailCand(e.target.value)}
                            />
                            <hr />
                            <div className="Tittle_Element">Candidate Name:</div>
                            <input
                                className='TE_Input'
                                type="text"
                                value={nameCand}
                                placeholder="Please enter Candidate name"
                                onChange={(e) => setNameCand(e.target.value)}
                            />
                            <hr />
                            <div className="Tittle_Element">Intro:</div>
                            <input
                                className='TE_Input'
                                type="text"
                                value={intro}
                                placeholder="Please enter Intro."
                                onChange={(e) => setIntro(e.target.value)}
                            />
                            <hr />
                            <div className="Tittle_Element">Link test:</div>
                            <input
                                className='TE_Input'
                                type="text"
                                value={link}
                                placeholder="Please enter Link Test"
                                onChange={(e) => setLink(e.target.value)}
                            />
                            <hr />
                            <div className="Tittle_Element">Outro:</div>
                            <input
                                className='TE_Input'
                                type="text"
                                value={outro}
                                placeholder="Please enter Outro"
                                onChange={(e) => setOutro(e.target.value)}
                            />
                            <hr />
                            <Button className="Tittle_Element" style={{ height: "40px", marginTop: "12px" }} type='primary' shape='round'
                            onClick={()=>setModaOpen(true)}
                                >Send Mail</Button>
                            <Modal 
                                title="Send mail to Candidate"
                                centered
                                open={modaOpen}
                                onOk={confirm}
                                onCancel={cancel}
                                okText="Confirm" 
                                cancelText="Cancel">
                                <p>Are you sure to send this mail?</p>
                            </Modal>
                        </form>
                    </div>
                </div>
            </div>
        </Content>
    );
}
export default MailMgr



