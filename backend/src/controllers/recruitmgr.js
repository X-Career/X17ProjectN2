import Recruitmgr from "../models/recruitmgr.js";
import recruitmgrValidator from "../validation/recruitmgr.js";



export const getAll = async (req, res)=>{
    try {
        const data = await Recruitmgr.find({});
        if (!data || data.length === 0){
            return res.status(404).json({
                message: "There is no recruitment",
            })
        }
        return res.status(200).json({
            message: "Recruitmgr has been",
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
        const data = await Recruitmgr.findById(req.params.id).populate("jobs")
        if (!data){
            return res.status(404).json({
                message: "There is no recruitment",
            })
        }
        return res.status(200).json({
            message: "Recruitmgr has been",
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
        const {error} = recruitmgrValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        const data = await Recruitmgr.create(req.body);
        if (!data){
            return res.status(404).json({
                message: "Create Recruitmgr not successful",
            })
        }

        return res.status(200).json({
            message: "Create Recruitmgr successful",
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
        const {error} = recruitmgrValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        const data = await Recruitmgr.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!data){
            return res.status(404).json({
                message: "Update Recruitmgr not successful",
            })
        }
        return res.status(200).json({
            message: "Update Recruitmgr successful",
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
        const data = await Recruitmgr.findByIdAndDelete(req.params.id);
        if (!data){
            return res.status(404).json({
                message: "Delete Recruitmgr not successful",
            })
        }
        return res.status(200).json({
            message: "Delete Recruitmgr successful",
            datas: data,
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}