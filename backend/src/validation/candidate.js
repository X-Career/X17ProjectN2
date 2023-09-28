import BaseJoi from "joi"
import DateJoi from "@joi/date"
const Joi = BaseJoi.extend(DateJoi)

const candidateValidator = Joi.object({
    fullName: Joi.string().required().min(3).max(255),
    gender: Joi.string().required().min(3),
    age: Joi.number().required(),
    phone: Joi.number().required(),
    email: Joi.string().required().email(),
    point:Joi.number(),
    datetoInter:Joi.date(),
    result:Joi.string(),
    datetoGetjob:Joi.date(),
});

export default candidateValidator;