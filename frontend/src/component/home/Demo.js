import { Modal } from "antd";
import React, { useState } from "react";

const Demo = (props) =>{
    const [open, setOpen] = useState(true)

    return (
        <Modal
            open={open}
            onCancel={props.handleClose}
            footer={false}
            maskClosable={true}
            width={1050}
            className="iframe_demo"
        >
            <iframe width="1000" height="600" 
            style={{marginTop: '1.5rem'}}
            src="https://www.youtube.com/embed/wmmRQthVPko" 
            title="ELEARNING STUDIO GIỚI THIỆU" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            ></iframe>
        </Modal>
    )
}

export default Demo