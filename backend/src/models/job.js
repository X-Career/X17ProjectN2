import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    position:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    tests: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Test",
    },
    date:{
        type: Date,
        required: true
    },
},{
    versionKey: false,
    timestamps: true
});
jobSchema.plugin(mongoosePaginate)

export default mongoose.model("Job", jobSchema);
