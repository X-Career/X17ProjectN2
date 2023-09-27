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
    req:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Test",
    },
},{
    versionKey: false,
    timestamps: true
});

export default mongoose.model("Job", jobSchema);
