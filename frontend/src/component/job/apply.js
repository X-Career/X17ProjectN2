import { Modal, Input, message } from "antd";
import React, { useState, useEffect } from "react";
import fbConfig from "../../firebaseConfig";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addCandidate } from "../../services/candidate";
const Apply = (props) => {
    const [open, setOpen] = useState(true)
    const [job, setJob] = useState(props.job);
    const user = JSON.parse(localStorage.getItem('user'))
    const [fileCV, setFileCV] = useState(undefined);
    const [fileCVPerc, setFileCVPerc] = useState(0);
    const [inputs, setInputs] = useState({});

    const handleSubmit = async (e) => {
        try {
                const data = {
                    jobId: job._id,
                    recruitId: props.recruit,
                    userId: user._id,
                    fileCV: inputs.fileCVUrl,
                };
                const res = await addCandidate(data);
                if (res.status === 201) {
                    if(!res.data.status){
                        message.success(res.data.message)
                    }else{
                        message.error(res.data.message)
                    }
                    props.handleClose();
                    props.refresh(props.recruit);
                } else {
                    message.error(res.data.message)
                }
            }
        catch (error) {
            console.error("Đã xảy ra lỗi khi tải CV:", error);
        }
    }

    const uploadFile = (file, fileType) => {
        const storage = getStorage(fbConfig);
        const folder = fileType === 'fileCVUrl' ? "candidateCV/" : null;
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, folder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

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
                    setInputs((prev) => {
                        return {
                            ...prev,
                            [fileType]: downloadURL,
                        }
                    })
                });
            }
        );
    }

    useEffect(() => {
        fileCV && uploadFile(fileCV, "fileCVUrl")
    }, [fileCV])
    return (
        <Modal
            open={open}
            width={500}
            onOk={handleSubmit}
            onCancel={props.handleClose}
        >
            <div className="column-center">
                <img style={{ width: '450px' }} src="../images/apply.png" />
                <Input
                    type="file"
                    accept="pdf/*"
                    className="fileCV"
                    onChange={(e) => setFileCV((prev) => e.target.files[0])}
                />
            </div>

        </Modal>
    )


}

export default Apply