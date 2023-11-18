import Candidate from "../models/candidate.js";
import candidateValidator from "../validation/candidate.js";
import Job from "../models/job.js";
import User from "../models/user.js";
import recruitmgr from "../models/recruitmgr.js";




export const getAll = async (req, res) => {
    try {

        const data = await Candidate.find({'recruitId':req.params.recruitId}).populate("jobId").populate('userId');
        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "There is no recruitment",
            })
        }
        console.log(data);
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
export const getDetail = async (req, res) => {
    try {
        const data = await Candidate.findById(req.params.id).populate("jobId").populate('userId')
        if (!data) {
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

export const create = async (req, res) => {
    try {

        const { fileCV, jobId, userId, recruitId } = req.body;

        const { error } = candidateValidator.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        if (fileCV) {
            const newCandidate = new Candidate({
                jobId,
                userId,
                recruitId,
                fileCV,
            })
            const candidate = await newCandidate.save();
            console.log(candidate.jobId)
            if (!candidate) {
                return res.status(404).json({ message: "upload not successful" });
            }
            

             // Gửi CV Gửi theo job

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
            // Gửi CV Gửi vào user tuyển dụng

            const updateUsers = await User.findByIdAndUpdate(candidate.userId, {
                $addToSet: {
                    candidates: candidate._id,
                },
            });
            if (!updateUsers) {
                return res.status(404).json({
                    message: "Add Infor User for Candidates not successful",
                });
            }

            // Gửi CV Gửi vào đợt tuyển dụng
            const updateRecuit = await recruitmgr.findByIdAndUpdate(candidate.recruitId, {
                $addToSet: {
                    candidates: candidate._id,
                },
              });
            if (!updateRecuit) {
                return res.status(404).json({
                  message: "Add RecruitId for new Candidates not successful",
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

export const update = async (req, res) => {
    try {
        const { error } = candidateValidator.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        const data = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
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

export const remove = async (req, res) => {
    try {
        const data = await Candidate.findByIdAndDelete(req.params.id);
        if (!data) {
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


export const getCandidateOfRecruit = async (req, res) => {
    try {
        const data = await Candidate.find({ recruitId: req.params.recruitId }).populate('jobId').populate('userId');
        if (!data) {
            return res.status(404).json({
                message: "No candidate found",
            });
        }
        return res.status(200).json({
            message: "Find candidate of recruit success",
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

export const getMyHistory =  async(req, res) =>{
    console.log('be');
    try {
        const data = await Candidate.find({ userId: req.params.userId }).populate('jobId');
        if (!data) {
            return res.status(404).json({
                message: "No candidate found",
            });
        }
        return res.status(200).json({
            message: "Find your history",
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}
