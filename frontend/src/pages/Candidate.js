import React, { useState } from "react";
import { addCandidate } from "../services/candidate";

const Candidate = ()=>{
    const [fields, setFields] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [fileCV, setFileCV] = useState("");


    const uploadCV = (e) =>{
        const file = e.target.files[0];
        TransformFile(file);
        setIsloading(true);
    }
    const TransformFile = (file) => {
        const reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setFileCV(reader.result);
            setFields(true);
            setIsloading(false);
            setTimeout(() => {
              setIsloading(false);
              setFields(false);
            }, 3000);
          };
        } else {
          setFileCV("");
          setFields(true);
          setTimeout(() => {
            setIsloading(false);
            setFields(false);
          }, 3000);
        }
      };
      const sendCV = async (e) => {
        e.preventDefault();
        try {
            if (!fullName || !gender || !age || !phone || !email || !fileCV) {
              setTimeout(() => {
                setFields(false);
                setIsloading(false);
              }, 3000);
            } else {
              const data = {
                fullName: fullName,
                gender: gender,
                age: age,
                phone: phone,
                email: email,
                fileCV: fileCV,
              };
              const { candidate } = await addCandidate(data);
              console.log(candidate);
              setTimeout(() => {
                setFields(false);
              }, 3000);
            }
          } catch (error) {
            console.error("Đã xảy ra lỗi khi tải CV:", error);
          }
        };


    return (
        <><h1>TEST</h1><div className="Test">
            <div className="fullName">
                <input
                    type="text"
                    required
                    value={fullName}
                    placeholder="Give me a fullName..."
                    className="setFullName"
                    onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="gender">
                <input
                    type="text"
                    required
                    value={gender}
                    placeholder="Give me a gender..."
                    className="setGender"
                    onChange={(e) => setGender(e.target.value)} />
            </div>
            <div className="age">
                <input
                    type="text"
                    required
                    value={age}
                    placeholder="Give me a age..."
                    className="setAge"
                    onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="phone">
                <input
                    type="text"
                    required
                    value={phone}
                    placeholder="Give me a phone..."
                    className="setPhone"
                    onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="email">
                <input
                    type="text"
                    required
                    value={email}
                    placeholder="Give me a email..."
                    className="setEmail"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <label>
                <p>click here to upload</p>
                <input
                    type="file"
                    accept="pdf/*"
                    className="fileCV"
                    onChange={uploadCV} />
            </label>
            <button
                type="button"
                onClick={sendCV}
            > SendData</button>
        </div></>
    )
}
export default Candidate