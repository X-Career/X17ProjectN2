import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        defaultValue: "Noposition"
    },
    salary:{
        type: Number,
        required: true
    },
    jobId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            require: true
        }
    ]
},{
    versionKey: false, timestamps: true
})
export default mongoose.model("Position", positionSchema);