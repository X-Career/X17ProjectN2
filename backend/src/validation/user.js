import Joi from "joi";

export const signUpValid = Joi.object(
    {
        firstName: Joi.string().required().min(3).messages({
            "string.empty": "firstName is required",
            "any.required": "firstName is required",
            "string.min": "firstName must be at least 3 characters"
        }),
        lastName: Joi.string().required().min(3).messages({
            "string.empty": "lastName is required",
            "any.required": "lastName is required",
            "string.min": "lastName must be at least 3 characters"
        }),
        email: Joi.string().email().required().messages({
            "string.empty": "email is required",
            "any.required": "email is required",
            "string.email": "email is invalid"
        }),
        gender: Joi.string().required().min(2).messages({
            "string.empty": "gender is required",
            "any.required": "gender is required",
            "string.email": "gender is invalid",
        }),
        age: Joi.number().required().messages({
            "string.empty": "age is required",
            "any.required": "age is required",
            "string.email": "age is invalid",
        }),
        phone: Joi.number().required().messages({
            "string.empty": "phone is required",
            "any.required": "phone is required",
            "string.email": "phone is invalid",
        }),
        password: Joi.string().required().messages({
            "string.empty": "password is required",
            "any.required": "password is required",
            "string.min": "password must be at least 6 characters",
        }),
        confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
            "any.required": "confirmpassword is required",
            "any.only": "confirmpassword is not matching",
            "string.empty": "confirmpassword is not empty",
        }),
    });
export const updateValid = Joi.object(
    {
        firstName: Joi.string().required().min(3).messages({
            "string.empty": "firstName is required",
            "any.required": "firstName is required",
            "string.min": "firstName must be at least 3 characters"
        }),
        lastName: Joi.string().required().min(3).messages({
            "string.empty": "lastName is required",
            "any.required": "lastName is required",
            "string.min": "lastName must be at least 3 characters"
        }),
        email: Joi.string().email().required().messages({
            "string.empty": "email is required",
            "any.required": "email is required",
            "string.email": "email is invalid"
        }),
        gender: Joi.string().required().min(2).messages({
            "string.empty": "gender is required",
            "any.required": "gender is required",
            "string.email": "gender is invalid",
        }),
        age: Joi.number().required().messages({
            "string.empty": "age is required",
            "any.required": "age is required",
            "string.email": "age is invalid",
        }),
        phone: Joi.number().required().messages({
            "string.empty": "phone is required",
            "any.required": "phone is required",
            "string.email": "phone is invalid",
        }),
        password: Joi.string().required().messages({
            "string.empty": "password is required",
            "any.required": "password is required",
            "string.min": "password must be at least 6 characters",
        }),
        img: Joi.string()
    }
)

export const signInValid = Joi.object(
    {
        email: Joi.string().email().required().messages({
            "string.empty": "email is required",
            "any.required": "email is required",
            "string.email": "email is invalid"
        }),
        password: Joi.string().required().messages({
            "string.empty": "password is required",
            "any.required": "password is required",
            "string.min": "password must be at least 6 characters",
        }),
    });