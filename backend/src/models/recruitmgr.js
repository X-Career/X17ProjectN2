import mongoose from "mongoose";

const recruitmgrSchema = new mongoose.Schema({
    nameRecruit:{
        type: String,
        required: true,
    },
    datetoStart:{
        type: Date,
        require:true,
    },
    datetoEnd:{
        type: Date,
        require:true,
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Job",
    }],
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Candidate",
    }],
},{
    versionKey: false,
    timestamps: true
});

export default mongoose.model("Recruitmgr", recruitmgrSchema);
