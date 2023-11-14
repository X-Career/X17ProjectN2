import React, { useContext, useEffect, useState } from "react";
import { Layout, Row, Col, Button, Input, Tabs, notification } from "antd";
import Header from "../component/header";
import Footer from "../component/footer";
import { EditOutlined } from "@ant-design/icons";
import { UserContext } from "../context/user";
import { editUser, updateInfo, updatePassword } from "../services/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fbConfig from "../firebaseConfig";
import {getallCandidate2 } from "../services/candidate";



const { TabPane } = Tabs;
const { Content } = Layout;

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [age, setAge] = useState(user.age);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({});
  const [fileImgPerc, setFileImgPerc] = useState(0);
  const [img, setImg] = useState('');



  // Đang làm
  const [candidate,setCandidate] = useState([]);
  useEffect(() => {
    getCandidates();
  }, []);
  const getCandidates = async () => {
    const { data } = await getallCandidate2(user.candidates);
    setCandidate(data.datas);
  };
  
  console.log(candidate)

  
  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.phone);
    setAge(user.age);
  }, [user]);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        phone: phone,
      };

      const response = await updateInfo(user._id, updatedUser);
      console.log("Profile updated:", response.data);

      setUser({ ...user, ...updatedUser });
      setPhone(updatedUser.phone);
      setAge(updatedUser.age);

      setFirstName(updatedUser.firstName);
      setLastName(updatedUser.lastName);
      setPhone(updatedUser.phone);
      setAge(updatedUser.age);

      console.log("Profile updated successfully!");

      notification.success({
        message: "Update Successful",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Đã xảy ra lỗi khi update profile:", error);

      notification.error({
        message: "Update Failed",
        description: "An error occurred while updating your profile. Please try again.",
      });
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (!newPassword) {
        setError("Password is required");
        return;
      }
      if (newPassword.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      const response = await updatePassword(user._id, {
        password: newPassword,
      });
      console.log("Password updated:", response.data);

      setError("");
      setPassword("");

      notification.success({
        message: "Password Updated",
        description: "Your password has been updated successfully.",
      });
    } catch (error) {
      console.error("Đã xảy ra lỗi khi cập nhật mật khẩu:", error);
    }
  };

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

  return (
    <div>
      <Header />
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        
        <div style={{ height: "85vh", width: "80%" }}>
          <Row>
            <Col md={10}>
              <div
                className="Profile_Container"
                style={{ borderRadius: "5px" }}
              >
                <div className="renderAva">
                  <img
                    src={inputs.imgUrl || user.img}
                    style={{ width: "100%", borderRadius: "100%" }}
                  />
                </div>
                <label className="edit-img">
                  <EditOutlined />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImg((prev) => e.target.files[0])}
                  />
                  Edit
                </label>
                <div className="renderEmail">
                  <h2>{user.email}</h2>
                </div>
                <div
                  className="renderRole"
                  style={{ textTransform: "capitalize" }}
                >
                  {user.role}
                </div>
              </div>
            </Col>
            <Col md={14}>
              <div
                className="Profile_Container"
                style={{ borderRadius: "5px" }}
              >
                <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
                  <TabPane
                    tab="Thông tin cá nhân"
                    key="1"
                    style={{ minHeight: "600px", width: "100%" }}
                  >
                    <div className="Tittle" style={{ fontSize: "30px" }}>
                      Edit account
                    </div>
                    <form style={{ width: "100%" }}>
                      <div className="Tittle_Element">First Name:</div>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{ marginBottom: "12px" }}
                      ></Input>
                      <div className="Tittle_Element">Last Name:</div>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ marginBottom: "12px" }}
                      />
                      <div className="Tittle_Element">Your Email:</div>
                      <Input
                        value={user.email}
                        disabled
                        style={{ marginBottom: "12px" }}
                      />
                      <div className="Tittle_Element">Gender:</div>
                      <Input
                        value={user.gender}
                        disabled
                        style={{ marginBottom: "12px" }}
                      />
                      <div className="Tittle_Element">Age:</div>
                      <Input
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={{ marginBottom: "12px" }}
                      />
                      <div className="Tittle_Element">Phone:</div>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ marginBottom: "12px" }}
                      />
                    </form>
                    <Button
                      className="Tittle_Element"
                      style={{
                        height: "40px",
                        marginTop: "12px",
                        padding: "0 0 5px 0",
                        width: "30%",
                      }}
                      type="primary"
                      shape="default"
                      size="middle"
                      onClick={handleUpdateInfo}
                    >
                      Update Your Profile
                    </Button>
                  </TabPane>
                  <TabPane
                    tab="Tài khoản"
                    key="2"
                    style={{ minHeight: "600px", width: "100%" }}
                  >
                    <div className="Tittle_Element">Password:</div>
                    <Input.Password
                      placeholder="Please enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={{ marginBottom: "12px" }}
                    />
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <Button
                      className="Tittle_Element"
                      style={{
                        height: "40px",
                        marginTop: "12px",
                        padding: "0 0 5px 0",
                        width: "35%",
                      }}
                      type="primary"
                      shape="default"
                      size="middle"
                      onClick={handleUpdatePassword}
                    >
                      Update Your Password
                    </Button>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer />
    </div>
  );
};

export default Profile;
