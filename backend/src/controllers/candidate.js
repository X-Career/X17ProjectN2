import cloudinary from "../configs/cloudinaryConfig.js";
import Candidate from "../models/candidate.js";
import candidateValidator from "../validation/candidate.js";



export const getAll = async (req, res)=>{
    try {
        const data = await Candidate.find({});
        if (!data || data.length === 0){
            return res.status(404).json({
                message: "No candidate found",
            })
        }
        return res.status(200).json({
            message: "Cadidate has been applied",
            datas: data,
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}
export const getDetail = async (req, res)=>{
    try {
        const data = await Candidate.findById(req.params.id)
        if (!data){
            return res.status(404).json({
                message: "No candidate found",
            })
        }
        return res.status(200).json({
            message: "Cadidate has been applied",
            datas: data,
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}

export const create = async (req, res)=>{
    try {

        const {fullName, gender, age, phone, email, point, datetoInter, result, datetoGetjob, status, fileCV} = req.body;

        const {error} = candidateValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        if(fileCV){
            const uploadRes = await cloudinary.uploader.upload(fileCV,{
                upload_preset:'projectN2',
            })
            if(uploadRes){
                const newCandidate = new Candidate({
                    fullName,
                    gender,
                    age,
                    phone,
                    email,
                    point,
                    datetoInter,
                    result,
                    datetoGetjob,
                    status,
                    fileCV: uploadRes
                })
                const candidate = await newCandidate.save();
                console.log(candidate)
                if(!candidate){
                    return res.status(404).json({message: "upload not successful"});
                } 
                return res.status(200).json({
                    message: "Create Cadidate successful",
                    datas: candidate,
                })
            }
        }
        // const data = await Candidate.create(req.body);
        // if (!data){
        //     return res.status(404).json({
        //         message: "Create Cadidate not successful",
        //     })
        // }


    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}

export const update = async (req, res)=>{
    try {
        const {error} = candidateValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        const data = await Candidate.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!data){
            return res.status(404).json({
                message: "Update Cadidate not successful",
            })
        }
        return res.status(200).json({
            message: "Update Cadidate successful",
            datas: data,
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}

export const remove = async (req, res)=>{
    try {
        const data = await Candidate.findByIdAndDelete(req.params.id);
        if (!data){
            return res.status(404).json({
                message: "Delete Cadidate not successful",
            })
        }
        return res.status(200).json({
            message: "Delete Cadidate successful",
            datas: data,
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}