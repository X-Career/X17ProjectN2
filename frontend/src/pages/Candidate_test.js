import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fbConfig from "../firebaseConfig";
import { addCandidate } from "../services/candidate";
import Candidates from "../component/candidate/Cadidates";




const Candidate = () => {
    const [fields, setFields] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [fileCV, setFileCV] = useState(undefined);
    const [fileCVPerc, setFileCVPerc] = useState(0);
    const [inputs, setInputs] = useState({});

    const handleSubmit = async (e)=>{
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
                  fileCV: inputs.fileCVUrl,
                };
                const { candidate } = await addCandidate(data);
                console.log(candidate);
                setTimeout(() => {
                  setFields(false);
                }, 3000);
              }} 
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
            if(fileType === 'fileCVUrl'){
                setFileCVPerc (Math.round(progress))
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
            setInputs((prev)=>{
                return{
                    ...prev,
                    [fileType]: downloadURL,
                }
            })
            });
        }
        );
    }
    console.log(typeof(fileCV))

    useEffect(()=>{
        fileCV && uploadFile(fileCV,"fileCVUrl")
    },[fileCV])
    return (
        <>
        <h1>Test</h1>
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
                <label>filelCV</label>{fileCVPerc>0 && "uploading..." + fileCVPerc + "%"}
                <input
                    type="file"
                    accept="pdf/*"
                    className="fileCV"
                    onChange={(e)=>setFileCV((prev)=>e.target.files[0])}
                     />
            </label>
            <button
                type="button"
                onClick={handleSubmit}
            > SendData</button>
        </>
    )
}
export default Candidate