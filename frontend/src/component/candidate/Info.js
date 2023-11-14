import React, { useContext } from "react";
import { Content } from "antd/es/layout/layout";
import { CandidateContext } from "../../context/candidate";
import { Row, Col } from "antd";
import './candidate.css'

const Info = () => {
    const { candidate } = useContext(CandidateContext)

    console.log(candidate);
    return (<Content
        id='profile'
        style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 800,
            backgroundColor: '#262d35'
        }}
    >
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <Row className="w-100 flex-center absolute top-15">
            <Col span={12}>
               <div className="candidate_avt">
                 <img src={candidate.userId.img} style={{ width: '100%', borderRadius: "100%" }} />
               </div>
            </Col>
        </Row>

    </Content>
    )
}

export default Info