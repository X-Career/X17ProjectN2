import express from 'express';
import { connect } from 'mongoose';
import dotenv from "dotenv";
import router from './routers/index.js';
import mongoose from 'mongoose';
import cors from 'cors';



const app = express();
app.use(express.urlencoded({ extended: true }))
dotenv.config()

const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB

connect(URI_DB);
app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use("/api", router)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
});
mongoose.connect(`${URI_DB}`).then(()=>{
    console.log("Database connection established")
})