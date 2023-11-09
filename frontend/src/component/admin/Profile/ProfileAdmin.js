import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Layout, Row, theme, Form, Input, Select, InputNumber } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { UserContext } from '../../../context/user';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fbConfig from "../../../firebaseConfig";
import { editUser } from '../../../services/auth';




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
            <div>
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

                        <Form
                            layout='vertical'
                            style={{width: '30%'}}
                        >
                            <div className='flex-between'>
                                <Form.Item
                                    label='First Name'
                                    // name='firstName'
                                    rules={[{ required: true, message: 'Please enter first name!' }]}
                                >
                                    <Input value={user.firstName} />
                                </Form.Item>
                                <Form.Item
                                    label='Last Name'
                                    // name='lastName'
                                    rules={[{ required: true, message: 'Please enter last name!' }]}
                                >
                                    <Input value={user.lastName} />
                                </Form.Item>
                            </div>
                            <div className='flex-between'>
                                <Form.Item
                                    label='Gender'
                                    // name='gender'
                                    style={{ width: '30%' }}
                                    rules={[{ required: true, message: 'Please select your gender!' }]}
                                >
                                    <Select value={user.gender} > 
                                       <>
                                            {['Male', 'Female', 'Other'].map((item, key) =>{
                                                return <Select.Option value={item} key={key}>{item}</Select.Option>
                                            })
                                       }
                                       </>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label='Age'
                                    // name='age'
                                    style={{ width: '50%' }}
                                    rules={[{ required: true, message: 'Please select your age!' }]}
                                >
                                    <InputNumber value={user.age} />
                                </Form.Item>
                            </div>
                            <div className='flex-between'>
                                <Form.Item
                                    label='Email'
                                    // name='Email'
                                    rules={[{ required: true, message: 'Please enter your email!' }]}
                                >
                                    <Input value={user.email} />
                                </Form.Item>
                                <Form.Item
                                    label='Phone number'
                                    // name='phone'
                                    style={{ width: '50%' }}
                                    rules={[{ required: true, message: 'Please enter your phone!' }]}
                                >
                                    <InputNumber value={user.age} />
                                </Form.Item>
                            </div>

                        </Form>
                    </Row>
                </div>
            </div>
        </Content>
    );
}
export default ProfileAdmin



