import Joi from "joi"

const candidateValidator = Joi.object({
    fullName: Joi.string().required().min(3).max(255),
    gender: Joi.string().required().min(3),
    age: Joi.number().required(),
    phone: Joi.number().required(),
    email: Joi.string().required().email(),
});

export default candidateValidator;