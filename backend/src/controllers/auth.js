import User from "../models/user.js"
import { signInValid, signUpValid, updateInfoValidation, updatePasswordValid, updateValid } from "../validation/user.js"
import bcrypyjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

const { SECRET_CODE } = process.env;


export const signUp = async (req, res) => {
    try {
        // Validation
        const { firstName, lastName, email, password, phone, age, gender } = req.body
        const { error } = signUpValid.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.json({
                status: 400,
                message: errors,
            });
        }

        // Check email
        const userExists = await User.findOne({ email })
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
            phone,
            age,
            gender,
            password: hashedPassword,
        })
        //  Get info for client
        // user.password = undefined;
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

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "Get user information successfully",
            user: user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, img } = req.body
        const { error } = updateValid.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message),
            })
        }
        
        const hashedPassword = await bcrypyjs.hash(password, 10);
        const data = await User.findByIdAndUpdate(req.params.id,{
            firstName,
            lastName,
            email,
            password: hashedPassword,
            img,
        }, {new:true})
        if (!data) {
            return res.status(404).json({
                message: "Update User not successful",
            })
        }
        return res.status(200).json({
            message: "Update User successful",
            datas: data,
        })

    } catch (error) {
        return res.json({
            status: 500,
            message: error
        })
    }
}

export const updateInfo = async (req, res) => {
    try {
        const { firstName, lastName, age, phone, img } = req.body;
        const { error } = updateInfoValidation.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message),
            });
        }

        // Kiểm tra xem các trường có thể thay đổi không
        const allowedFields = ['firstName', 'lastName', 'age', 'phone', 'img'];
        const invalidFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));

        if (invalidFields.length > 0) {
            return res.status(400).json({
                message: `Cannot update the following fields: ${invalidFields.join(', ')}`,
            });
        }

        // Cập nhật thông tin
        const data = await User.findByIdAndUpdate(
            req.params.id,
            {
                firstName,
                lastName,
                age,
                phone,
                img,
            },
            { new: true }
        );

        if (!data) {
            return res.status(404).json({
                message: "Update Info not successful",
            });
        }

        return res.status(200).json({
            message: "Update Info successful",
            datas: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


export const updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { error } = updatePasswordValid.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message),
            });
        }
  
        const hashedPassword = await bcrypyjs.hash(password, 10);
  
        const data = await User.findByIdAndUpdate(req.params.id, {
            password: hashedPassword,
        }, { new: true });
  
        if (!data) {
            return res.status(404).json({
                message: "Update Password not successful",
            });
        }
  
        return res.status(200).json({
            message: "Update Password successful",
            datas: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
  };

export const singIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signInValid.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.json({
                status: 500,
                message: errors
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                status: 400,
                message: "User not found"
            })
        }
        const isMatch = await bcrypyjs.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                status: 400,
                message: "Invalid credentials"
            })
        }
        //  Creat jwt token
        const token = jwt.sign(
            { id: user.id },
            SECRET_CODE,
            { expiresIn: "1d" }
        )

        //  Return result:
        user.password = undefined
        return res.json({
            status: 200,
            message: "User logged in successfully",
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