import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        defaultValue: "Noposition"
    },
    des:{
        type: String,
        require:true,
    },
    testId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
            require: true
        }
    ],
},{
    versionKey: false, timestamps: true
})
export default mongoose.model("Mail", mailSchema);