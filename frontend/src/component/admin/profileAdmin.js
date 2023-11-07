import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Layout, Row, theme, Form } from 'antd';
import "./Admin.css"
import { EditOutlined } from '@ant-design/icons';
import { UserContext } from '../../context/user';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fbConfig from "../../firebaseConfig";
import { editUser } from '../../services/auth';




const { Content } = Layout;


const ProfileAdmin = () => {

    const { user, setUser } = useContext(UserContext)
    const [inputs, setInputs] = useState({});
    const [fileImgPerc, setFileImgPerc] = useState(0);
    const [img, setImg] = useState('');
    const lastName = user.lastName
    const firstName = user.firstName
    const email = user.email
    const gender = user.gender
    const [phone,setPhone] = useState(`${user.phone}`)
    const [age,setAge] = useState(`${user.age}`)
    const [password, setPassword] = useState('')






    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log('abc')
            const data = {
                lastName: lastName,
                firstName: firstName,
                email: email,
                password: password,
                gender: gender,
                age: age,
                phone: phone,
                img: inputs.imgUrl
            };
            const { updateprofile } = await editUser(user._id, data);
            console.log(updateprofile);
            setTimeout(() => {
            }, 3000);

        } catch (error) {
            console.error("Đã xảy ra lỗi khi update profile:", error);
        }
    }
    console.log(user.password)
    const uploadFile = (file, fileType) => {
        const storage = getStorage(fbConfig);
        const folder = fileType === 'imgUrl' ? "avatars/" : null;
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, folder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (fileType === 'imgUrl') {
                    setFileImgPerc(Math.round(progress))
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
        img && uploadFile(img, "imgUrl")
    }, [img])
    console.log(inputs)
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
            <div style={{ height: "100vh" }}>
                <div className='Tittle'>Profile Admin</div>
                <div>
                    <Row>
                        <Col md={10}>
                            <div className='Profile_Container'>
                                <div className='renderAva'>
                                    <img src={inputs.imgUrl || user.img} style={{ width: '100%', borderRadius: "100%" }} />
                                </div>
                                <label className="edit-img">
                                    <EditOutlined />
                                    <input
                                        style={{ display: 'none' }}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImg((prev) => e.target.files[0])}
                                    />
                                    Edit
                                </label>
                                <div className='renderEmail'>
                                    <h2>{user.email}</h2>
                                </div>
                                <div className='renderRole' style={{ textTransform: "capitalize" }}>
                                    {user.role}
                                </div>
                            </div>
                        </Col>
                        <Col md={14}>
                            <div className='Profile_Container'>
                                <div className='Tittle' style={{ fontSize: "30px" }}>Edit acount</div>
                                <form style={{ width: "100%" }}>
                                    <div className="Tittle_Element">First Name:</div>
                                    <div
                                        className='TE_Input'
                                        type="text"
                                    >{user.firstName}</div>
                                    <hr />
                                    <div className="Tittle_Element">Last Name:</div>
                                    <div
                                        className='TE_Input'
                                        type="text"
                                    >{user.lastName}</div>
                                    <hr />
                                    <div className="Tittle_Element">Your Email:</div>
                                    <div
                                        className='TE_Input'
                                        type="email"
                                    >{user.email}</div>
                                    <hr />
                                    <div className="Tittle_Element">Gender:</div>
                                    <div
                                        className='TE_Input'
                                        type="email"
                                    >{user.gender}</div>
                                    <hr />
                                    <div className="Tittle_Element">Age:</div>
                                    <input
                                        value={user.age}
                                        className='TE_Input'
                                        type="number"
                                        placeholder="Please enter your age."
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                    <hr />
                                    <div className="Tittle_Element">Phone:</div>
                                    <input
                                        value={user.phone}
                                        className='TE_Input'
                                        type="number"
                                        placeholder="Please enter your phone number."
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <hr />
                                    <div className="Tittle_Element">Password:</div>
                                    <input
                                        className='TE_Input'
                                        type="password"
                                        placeholder="Please enter your new password."
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                </form>
                                <Button
                                    className="Tittle_Element"
                                    style={{ height: "40px", marginTop: "12px" }}
                                    type='primary'
                                    shape='round'
                                    onClick={handleUpdate}
                                >Update Your Profile</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Content>
    );
}
export default ProfileAdmin



