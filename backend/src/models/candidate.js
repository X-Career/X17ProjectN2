import mongoose from 'mongoose';

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
    },
    datetoInter:{
        type: Date,
    },
    result:{
        type: String,
    },
    datetoGetjob:{
        type: Date,
    },
    satus: {
        type: String,
        default:"Applying",
    },
    },
    {
        timestamps: true, 
        versionKey: false,
    }
);

export default mongoose.model("Candidate", candidateSchema)