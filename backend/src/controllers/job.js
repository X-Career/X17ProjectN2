import Job from "../models/job.js";
import jobValidator from "../validation/job.js";
import Recruitmgr from "../models/recruitmgr.js";




export const getAll = async (req, res)=>{
    try {
        // const data = await Job.find({});
        const {_page = 1, _limit = 7, _sort = "createdAt", _order = "asc"} = req.query;
        const options = {
            page: _page,
            limit: _limit,
            sort : {
                [_sort]: _order === "asc" ? 1 : -1,
            }
        }

        const data = await Job.paginate({}, options);
        console.log(data);

        if (!data.docs || data.docs.length === 0){
            return res.status(404).json({
                message: "No Job",
            })
        }
        return res.status(200).json({
            message: "Job has been",
            datas: data,
        });

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}
export const getDetail = async (req, res)=>{
    try {
        const data = await Job.findById(req.params.id).populate("candidates")
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
        const updateRecuit = await Recruitmgr.findByIdAndUpdate(data.recruitId, {
            $addToSet: {
                jobs: data._id,
            },
          });
        if (!updateRecuit) {
            return res.status(404).json({
              message: "Add Recruit for new Job not successful",
            });
        }
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
    console.log('update', req.body);
    try {
        const {error} = jobValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        const data = await Job.findByIdAndUpdate(req.params.id, req.body, {new:true});

        const updateRecuit = await Recruitmgr.findByIdAndUpdate(data.recruitId, {
            $addToSet: {
                jobs: data._id,
            },
          });
        if (!updateRecuit) {
            return res.status(404).json({
              message: "Add Recruit for new Job not successful",
            });
        }
        
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
                message: "Delete Job not successful",
            })
        }
        return res.status(200).json({
            message: "Delete Job successful",
            datas: data,
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}