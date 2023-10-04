import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
    userEmail:{
        type: String,
        required: true,
    },
    candidateName:{
        type: String,
        required: true,
    },
    intro:{
        type: String,
        required: true,
    },
    linkTest:{
        type: String,
        required: true,
    }, 
    outro:{
        type: String,
        required: true,
    }
},{
    versionKey: false,
    timestamps: true
});

export default mongoose.model("Mail", mailSchema);
