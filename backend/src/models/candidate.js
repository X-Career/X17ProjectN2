import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";


const candidateSchema = new mongoose.Schema({
    point:{
        type: Number,
        default: null,
    },
    datetoInter:{
        type: Date,
        default: null,
    },
    result:{
        type: String,
        default: null,
    },
    datetoGetjob:{
        type: Date,
        default: null,
    },
    status: {
        type: String,
        default:"Applying",
    },
    fileCV:[ {
        type: Object, 
        required: true
    }],
    jobId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            require: true
        },
    },
    {
        timestamps: true, 
        versionKey: false,
    }
);
candidateSchema.plugin(mongoosePaginate)

export default mongoose.model("Candidate", candidateSchema)