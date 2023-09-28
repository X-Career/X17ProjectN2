import Job from "../models/job.js";
import jobValidator from "../validation/job.js";



export const getAll = async (req, res)=>{
    try {
        const data = await Job.find({});
        if (!data || data.length === 0){
            return res.status(404).json({
                message: "No Job",
            })
        }
        return res.status(200).json({
            message: "Job has been",
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
        const data = await Job.findById(req.params.id).populate("test")
        if (!data){
            return res.status(404).json({
                message: "No Job",
            })
        }
        return res.status(200).json({
            message: "Job has been",
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
        const {error} = jobValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        const data = await Job.create(req.body);
        if (!data){
            return res.status(404).json({
                message: "Create Job not successful",
            })
        }

        return res.status(200).json({
            message: "Create Job successful",
            datas: data,
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}

export const update = async (req, res)=>{
    try {
        const {error} = jobValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        const data = await Job.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!data){
            return res.status(404).json({
                message: "Update Job not successful",
            })
        }
        return res.status(200).json({
            message: "Update Job successful",
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
        const data = await Job.findByIdAndDelete(req.params.id);
        if (!data){
            return res.status(404).json({
                message: "Delete position not successful",
            })
        }
        return res.status(200).json({
            message: "Delete position successful",
            datas: data,
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}