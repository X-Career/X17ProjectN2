import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fbConfig from "../firebaseConfig";
import { addCandidate } from "../services/candidate";
import Candidates from "../component/candidate/Cadidates";




const CandidateTest = () => {
    const [fields, setFields] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [jobId, setjobId] = useState("");
    const [userId, setuserId] = useState("");

    const [fileCV, setFileCV] = useState(undefined);
    const [fileCVPerc, setFileCVPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!jobId || !fileCV ) {
                setTimeout(() => {
                    setFields(false);
                    setIsloading(false);
                }, 3000);
            } else {
                const data = {
                    jobId: jobId,
                    userId: userId,
                    fileCV: inputs.fileCVUrl,
                };
                const { candidate } = await addCandidate(data);
                console.log(candidate);
                setTimeout(() => {
                    setFields(false);
                }, 3000);
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
    console.log(typeof (fileCV))

    useEffect(() => {
        fileCV && uploadFile(fileCV, "fileCVUrl")
    }, [fileCV])
    return (
        <>
            <h1>Test</h1>
            <div className="jobId">
                <input
                    type="text"
                    required
                    value={jobId}
                    placeholder="Give me a JobId..."
                    className="setFullName"
                    onChange={(e) => setjobId(e.target.value)} />
            </div>
            <div className="userId">
                <input
                    type="text"
                    required
                    value={userId}
                    placeholder="Give me a UserId..."
                    className="setFullName"
                    onChange={(e) => setuserId(e.target.value)} />
            </div>
            <label>
                <p>click here to upload</p>
                <label>filelCV</label>{fileCVPerc > 0 && "uploading..." + fileCVPerc + "%"}
                <input
                    type="file"
                    accept="pdf/*"
                    className="fileCV"
                    onChange={(e) => setFileCV((prev) => e.target.files[0])}
                />
            </label>
            <button
                type="button"
                onClick={handleSubmit}
            > SendData</button>
        </>
    )
}
export default CandidateTest