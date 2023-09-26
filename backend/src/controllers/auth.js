import User from "../models/user.js"
import { signInValid, signUpValid } from "../validation/user.js"
import bcrypyjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const {SECRET_CODE} = process.env;


export const signUp = async (req,res) => {
    try {
        // Validation
        const {firstName, lastName, email, password} = req.body
        const {error} = signUpValid.validate(req.body, {abortEarly:false});
        if (error) {
        const errors = error.details.map(err => err.message)
        return res.status(400).json({
            message: errors,
        });
    }

        // Check email
    const userExists = await User.findOne({email})
    if (userExists) {
        return res.status(400).json({
            message: "User already exists"
        });
    }
        // Hash password
    const hashedPassword = await bcrypyjs.hash(password, 10);
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    })
        //  Get info for client
    user.password = undefined;
    return res.status(200).json({
        message: "User created successfully",
        user
    })
    } catch (error) {
        return res.status(500).json({
            message: error,
            error
        })
    }
};


export const singIn = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const {error} = signInValid.validate(req.body, {abortEarly:false})
        if(error) {
            const errors = error.details.map((err) => err.message)
            return res.status(500).json({
                message: errors
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }
        const isMatch = await bcrypyjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
        //  Creat jwt token
        const token = jwt.sign(
            {id: user.id},
            SECRET_CODE,
            {expiresIn: "1d"}
        )
        console.log(token)

        //  Return result:
        user.password = undefined
        return res.status(200).json({
            message:"User logged in successfully",
            user: user,
            accessToken: token
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};