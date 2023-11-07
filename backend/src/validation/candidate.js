import BaseJoi from "joi"
import DateJoi from "@joi/date"
const Joi = BaseJoi.extend(DateJoi)

const candidateValidator = Joi.object({
    point:Joi.number(),
    status: Joi.string(),
    datetoInter:Joi.date().format('YYYY-MM-DD HH:mm'),
    result:Joi.string(),
    datetoGetjob:Joi.date().format('YYYY-MM-DD HH:mm'),
    fileCV: Joi.string().required(),
    jobId:  Joi.string().required(),
    userId: Joi.string().required()
});

export default candidateValidator;