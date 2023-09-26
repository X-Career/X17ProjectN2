import Job from "../models/job.js";
import Position from "../models/position.js";
import positionValidator from "../validation/position.js";


export const getAll = async (req, res)=>{
    try {
        const data = await Position.find({}).populate("jobId");
        if (!data || data.length === 0){
            return res.status(404).json({
                message: "No position",
            })
        }
        return res.status(200).json({
            message: "Position has been",
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
        const data = await Position.findById(req.params.id).populate("jobId");
        if (!data){
            return res.status(404).json({
                message: "No position",
            })
        }
        return res.status(200).json({
            message: "Position has been",
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
        const {error} = positionValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        const data = await Position.create(req.body);
        if (!data){
            return res.status(404).json({
                message: "Create position not successful",
            })
        }
        const updateJobs = await Job.findByIdAndUpdate(data.jobId, {
            $addToSet: {
                positions: data._id,
            },
          });

        if (!updateJobs) {
            return res.status(404).json({
              message: "Add Job for new Position not successful",
            });
        }


        return res.status(200).json({
            message: "Create position successful",
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
        const {error} = positionValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        const data = await Position.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!data){
            return res.status(404).json({
                message: "Update position not successful",
            })
        }

        const updateJobs = await Job.findByIdAndUpdate(data.jobId, {
            $addToSet: {
                positions: data._id,
            },
          });

        if (!updateJobs) {
            return res.status(404).json({
              message: "Add Job for new Position not successful",
            });
        }

        return res.status(200).json({
            message: "Update position successful",
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
        const data = await Position.findByIdAndDelete(req.params.id);
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