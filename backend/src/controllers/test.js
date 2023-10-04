import Job from "../models/job.js";
import Test from "../models/test.js";
import testValidator from "../validation/test.js";


export const getAll = async (req, res)=>{
    try {
        const data = await Test.find({}).populate("jobId");
        if (!data || data.length === 0){
            return res.status(404).json({
                message: "No test",
            })
        }
        return res.status(200).json({
            message: "Tests has been created successfully",
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
        const data = await Test.findById(req.params.id).populate("jobId");
        if (!data){
            return res.status(404).json({
                message: "No test",
            })
        }
        return res.status(200).json({
            message: "Test has been created successfully",
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
        const {error} = testValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        const data = await Test.create(req.body);
        if (!data){
            return res.status(404).json({
                message: "Create test not successful",
            })
        }
        const updateJobs = await Job.findByIdAndUpdate(data.jobId, {
            $addToSet: {
                tests: data._id,
            },
          });

        if (!updateJobs) {
            return res.status(404).json({
              message: "Add Job for new Test not successful",
            });
        }


        return res.status(200).json({
            message: "Create test successful",
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
        const {error} = testValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        const data = await Test.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!data){
            return res.status(404).json({
                message: "Update test not successful",
            })
        }

        const updateJobs = await Job.findByIdAndUpdate(data.jobId, {
            $addToSet: {
                tests: data._id,
            },
          });

        if (!updateJobs) {
            return res.status(404).json({
              message: "Add Job for new Test not successful",
            });
        }

        return res.status(200).json({
            message: "Update test successful",
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
        const data = await Test.findByIdAndDelete(req.params.id);
        if (!data){
            return res.status(404).json({
                message: "Delete test not successful",
            })
        }
        
        return res.status(200).json({
            message: "Delete test successful",
            datas: data,
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}