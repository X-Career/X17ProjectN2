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
        gender: Joi.string(),
        age: Joi.number(),
        phone: Joi.number(),
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
        password: Joi.string().required().messages({
            "string.empty": "password is required",
            "any.required": "password is required",
            "string.min": "password must be at least 6 characters",
        }),
        img: Joi.string(),
        gender: Joi.string(),
        age: Joi.number(),
        phone: Joi.number(),
        repeatPassword: Joi.string()
    }
)

export const updateInfoValidation = Joi.object({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().email(),
    gender: Joi.string().min(2),
    age: Joi.number().required(),
    phone: Joi.number().required(),
    img: Joi.string(),
  });

export const updatePasswordValid = Joi.object({
    password: Joi.string().required().messages({
      "string.empty": "password is required",
      "any.required": "password is required",
      "string.min": "password must be at least 6 characters",
    }),
    
  });
  

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