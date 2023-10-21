import BaseJoi from "joi"
import DateJoi from "@joi/date"
const Joi = BaseJoi.extend(DateJoi)

const candidateValidator = Joi.object({
    fullName: Joi.string().required().min(3).max(255),
    gender: Joi.string().required().min(2),
    age: Joi.number().required(),
    phone: Joi.number().required(),
    email: Joi.string().required().email(),
    point:Joi.number(),
    status: Joi.string(),
    datetoInter:Joi.date().format('YYYY-MM-DD HH:mm'),
    result:Joi.string(),
    datetoGetjob:Joi.date().format('YYYY-MM-DD HH:mm'),
    fileCV: Joi.string().required(),
    jobId:  Joi.string().required()
});

export default candidateValidator;