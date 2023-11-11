import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        default:"member",
    },
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Candidate",
    }],
    img: {
        type: String, 
        default:"https://firebasestorage.googleapis.com/v0/b/projectn2-68dd7.appspot.com/o/avatars%2Favatar.jpeg?alt=media&token=968edf8b-8ad8-47bb-88b2-56fd96576430&_gl=1*1upi0cp*_ga*MzU0Nzk1MDI2LjE2OTYzMDg4NjY.*_ga_CW55HF8NVT*MTY5ODk5NzAzMS4xMy4xLjE2OTg5OTcwNDQuNDcuMC4w"
    },
    },
    {
        timestamps: true, 
        versionKey: false,
    }
);

export default mongoose.model("User", userSchema)