import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import User from "../models/user.js";
dotenv.config()

const {SECRET_CODE} = process.env;

export const checkPermissionAdmin = async (req, res, next) => {
    try {
        // Find token from headers
        const bearToken = req.headers.authorization
        if (!bearToken){
            throw new Error("You are not logged in")
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token){
            throw new Error("Empty Token!")   
        }
        // Decode token
        const decoded = jwt.verify(token, SECRET_CODE)
        // Firn user from token.payload decoded 
        const user = await User.findById(decoded.id)

        // Check role
        if(!user || user.role !== "admin"){
            throw new Error("You are not authorized to access this")
        }
        next()
    } catch (error) {
        return res.status(401).json({
            message: error.message || "You have no rights!"
        })
    }
}
export const checkPermissionHr = async (req, res, next) => {
    try {
        // Find token from headers
        const bearToken = req.headers.authorization
        if (!bearToken){
            throw new Error("You are not logged in")
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token){
            throw new Error("Empty Token!")   
        }
        // Decode token
        const decoded = jwt.verify(token, SECRET_CODE)
        // Firn user from token.payload decoded 
        const user = await User.findById(decoded.id)

        // Check role
        if(!user || user.role !== "humanresources"){
            throw new Error("You are not authorized to access this")
        }
        next()
    } catch (error) {
        return res.status(401).json({
            message: error.message || "You have no rights!"
        })
    }
}