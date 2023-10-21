import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";


const candidateSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
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