import { Modal, Upload, message } from "antd";
import React, { useState } from "react";
import fbConfig from "../../firebaseConfig";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { InboxOutlined } from '@ant-design/icons';
import { addCandidate } from "../../services/candidate";
const { Dragger } = Upload;
const Apply = (props) => {
    const [open, setOpen] = useState(true)
    const [fileCVPerc, setFileCVPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [job, setJob] = useState(props.job);
    const user = JSON.parse(localStorage.getItem('user'))

    const handleSubmit = async (e) => {
        try {
            const data = {
                jobId: job._id,
                recruitId: props.recruit,
                userId: user._id,
                fileCV: inputs,
            };
            console.log(data);
            const res = await addCandidate(data);
            if(res.status === 200){
                message.success(res.data.message)
                props.handleClose();
                props.refresh(props.recruit);
            }else{
                message.error(res.data.message)
            }

        }
        catch (error) {
            console.error("Đã xảy ra lỗi khi tải CV:", error);
        }
    }

    const uploadFile = (info, fileType) => {
        const storage = getStorage(fbConfig);
        const folder = fileType === 'fileCVUrl' ? "candidateCV/" : null;
        const fileName = new Date().getTime() + info.file.name
        const storageRef = ref(storage, folder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, info.file)

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (fileType === 'fileCVUrl') {
                    setFileCVPerc(Math.round(progress))
                }
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error)
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log(error)
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                    default:
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setInputs(downloadURL)
                    info.file.status = 'done';
                });
            }
        );
       
    }

    return (
        <Modal
            open={open}
            width={500}
            onOk={handleSubmit}
            onCancel={props.handleClose}
        >
            <div className="column-center">
                <img style={{ width: '450px' }} src="../images/apply.png" />
                <Dragger multiple={false} onChange={uploadFile}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
            </div>

        </Modal>
    )


}

export default Apply