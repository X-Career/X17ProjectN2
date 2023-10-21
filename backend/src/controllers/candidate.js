import Candidate from "../models/candidate.js";
import candidateValidator from "../validation/candidate.js";
import Job from "../models/job.js";




export const getAll = async (req, res)=>{
    try {
        // const data = await Candidate.find({});

        const {_page = 1, _limit = 7, _sort = "createdAt", _order = "asc"} = req.query;
        const options = {
            page: _page,
            limit: _limit,
            sort : {
                [_sort]: _order === "asc" ? 1 : -1,
            }
        }

        const data = await Candidate.paginate({}, options);
        console.log(data);

        if (!data.docs || data.docs.length === 0){
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
        const data = await Candidate.findById(req.params.id).populate("jobId")
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

        const {fullName, gender, age, phone, email, point, datetoInter, result, datetoGetjob, status, fileCV, jobId} = req.body;

        const {error} = candidateValidator.validate(req.body, {abortEarly: false}); 
        if (error){
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        if(fileCV){
                const newCandidate = new Candidate({
                    fullName,
                    gender,
                    age,
                    phone,
                    email,
                    point,
                    jobId,
                    datetoInter,
                    result,
                    datetoGetjob,
                    status,
                    fileCV,
                })
                const candidate = await newCandidate.save();
                console.log(candidate.jobId)
                if(!candidate){
                    return res.status(404).json({message: "upload not successful"});
                } 
                const updateJobs = await Job.findByIdAndUpdate(candidate.jobId, {
                    $addToSet: {
                        candidates: candidate._id,
                    },
                  });
                if (!updateJobs) {
                    return res.status(404).json({
                      message: "Add Job for new Candidates not successful",
                    });
                }
                return res.status(200).json({
                    message: "Create Cadidate successful",
                    datas: candidate,
                })
        }
        

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
        const updateJobs = await Job.findByIdAndUpdate(data.jobId, {
            $addToSet: {
                candidates: data._id,
            },
          });
        if (!updateJobs) {
            return res.status(404).json({
              message: "Add Job for new Candidates not successful",
            });
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