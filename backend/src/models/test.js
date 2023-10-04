import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        defaultValue: "Noposition"
    },
    des:{
        type: String,
        require:true,
    },
    point:{
        type: String,
        require: true,
    },
    jobId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            require: true
        }
    ],
    startTime:{
        type: Date,
        require:true,
    },
    endTime:{
        type: Date,
        require:true,
    },
},{
    versionKey: false, timestamps: true
})
export default mongoose.model("Test", testSchema);