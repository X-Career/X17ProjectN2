import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    des: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true
    },
    positions: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Position",
    },
},{
    versionKey: false,
    timestamps: true
});

export default mongoose.model("Job", jobSchema);
