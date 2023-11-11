import React, { useContext, useEffect, useState } from 'react';
import { Col, Layout, Row, Form, Input, Select, InputNumber, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { UserContext } from '../../../context/user';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fbConfig from "../../../firebaseConfig";
import { editUser } from '../../../services/auth';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import '../Admin.css';
import { useForm } from "antd/es/form/Form";



const { Content } = Layout;


const ProfileAdmin = () => {

    const { user, setUser } = useContext(UserContext)
    const [inputs, setInputs] = useState({});
    const [fileImgPerc, setFileImgPerc] = useState(0);
    const [img, setImg] = useState('');
    const [isUpdate, setUpdate] = useState(false)
    const [form] = useForm();
    const [newPass, setNewPass] = useState();
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = await form.validateFields();
            let data = Object.entries(formData).reduce((acc, [key, value]) => {
                if (value !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {});
            console.log(data);
            const res = await editUser(user._id, data);
            console.log(res);
            localStorage.setItem('user', res.data.user)
        
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

    const handleShowEdit = () =>{
        setUpdate(!isUpdate)
    
    }

    useEffect(() =>{
        //Form
        form.setFieldsValue({ firstName: user.firstName })
        form.setFieldsValue( { lastName: user.lastName })
        form.setFieldsValue({ email: user.email })
        form.setFieldsValue({ gender: user.gender })
        form.setFieldsValue({ age: user.age })
        form.setFieldsValue({ phone: user.phone })
    }, [])

    return (

        <Content
            id='profile'
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                backgroundColor: '#262d35'
            }}
        >
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            <div className='column-center relative'>
                <Row justify='end' className='w-100'>
                    <Button type='primary' onClick={handleShowEdit}>Edit</Button>
                </Row>

                <Row justify='center' className='admin_container'>
                    <Col md={24} className='relative'>
                        <div className='image_box'>
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
                            <div className='admin_name'>
                                <h1>{user.firstName} {user.lastName}</h1>
                                <h3 className='admin_role' style={{ textTransform: "capitalize" }}>
                                    {user.role}
                                </h3>
                            </div>

                        </div>
                    </Col>

                    <Col span={20}>
                        <Form
                            layout='vertical'
                            style={{ width: '100%' }}
                            form={form}
                        >
                            <div className='flex-between'>
                                <Form.Item
                                    style={{ width: '49%' }}
                                    label='First Name'
                                    name='firstName'
                                    rules={[{ required: isUpdate, message: 'Please enter first name!' }]}
                                >
                                    <Input readOnly={!isUpdate} />
                                </Form.Item>
                                <Form.Item
                                    label='Last Name'
                                    name='lastName'
                                    style={{ width: '49%' }}
                                    rules={[{ required: isUpdate, message: 'Please enter last name!' }]}
                                >
                                    <Input readOnly={!isUpdate} />
                                </Form.Item>
                            </div>
                            <div className='flex-between'>
                                <Form.Item
                                    label='Password'
                                    // name ='password'
                                    readOnly={!isUpdate}
                                    style={{ width: '49%' }}
                                    rules={[{ required: isUpdate, message: 'Please enter your pasword!' }]}
                                >
                                    <Input.Password
                                        placeholder="input password"
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Repeat password'
                                    name='repeatPassword'
                                    readOnly={!isUpdate}
                                    style={{ width: '49%' }}
                                    rules={[{ required: isUpdate, message: 'Please repeat your repepasword!' }]}
                                >
                                    <Input.Password
                                        placeholder="input password"
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </Form.Item>
                            </div>
                            <div className='flex-between'>
                                <Form.Item
                                    label='Gender'
                                    name='gender'
                                    style={{ width: '49%' }}
                                    rules={[{ required: isUpdate, message: 'Please select your gender!' }]}
                                >
                                    <Select disabled={!isUpdate}>
                                        <>
                                            {['Male', 'Female', 'Other'].map((item, key) => {
                                                return <Select.Option value={item} key={key}>{item}</Select.Option>
                                            })
                                            }
                                        </>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label='Age'
                                    name='age'
                                    style={{ width: '49%' }}
                                    rules={[{ required: isUpdate, message: 'Please select your age!' }]}
                                >
                                    <InputNumber style={{ width: '100%' }} value={user.age} readOnly={!isUpdate} />
                                </Form.Item>
                            </div>
                            <div className='flex-between'>
                                <Form.Item
                                    label='Email'
                                    name='email'
                                    style={{ width: '49%' }}
                                    rules={[{ required: isUpdate, message: 'Please enter your email!' }]}
                                >
                                    <Input value={user.email} readOnly={!isUpdate} />
                                </Form.Item>
                                <Form.Item
                                    label='Phone number'
                                    name='phone'
                                    style={{ width: '49%' }}
                                    rules={[{ required: isUpdate, message: 'Please enter your phone!' }]}
                                >
                                    <InputNumber style={{ width: '100%' }} value={user.age} readOnly={!isUpdate} />
                                </Form.Item>
                            </div>
                            <div className='flex-center'>
                                {isUpdate && <Button type='secondary' style={{ marginTop: '8px' }} onClick={handleUpdate}>
                                    Update
                                </Button>}
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>

        </Content>
    );
}
export default ProfileAdmin



