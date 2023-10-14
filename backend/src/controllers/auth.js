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
        return res.json({
            status: 400,
            message: errors,
        });
    }

        // Check email
    const userExists = await User.findOne({email})
    if (userExists) {
        return res.json({
            status: 400,
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
    return res.json({
        status: 200,
        message: "User created successfully",
        user
    })
    } catch (error) {
        return res.json({
            status: 500,
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
            return res.json({
                status: 500,
                message: errors
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                status: 400,
                message: "User not found"
            })
        }
        const isMatch = await bcrypyjs.compare(password, user.password);
        if(!isMatch){
            return res.json({
                status: 400,
                message:"Invalid credentials"
            })
        }
        //  Creat jwt token
        const token = jwt.sign(
            {id: user.id},
            SECRET_CODE,
            {expiresIn: "1d"}
        )

        //  Return result:
        user.password = undefined
        return res.json({
            status: 200,
            message:"User logged in successfully",
            user: user,
            accessToken: token
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: error
        })
    }
};


export const logOut = async (req, res) => {
    try {
        return res.json({
            status: 200,
            message: "Logout success",
        })

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}