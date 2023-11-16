import BaseJoi from "joi"
import DateJoi from "@joi/date"
const Joi = BaseJoi.extend(DateJoi)

const candidateValidator = Joi.object({
    point: Joi.number().allow(null),
    status: Joi.string(),
    datetoInter: Joi.date().format('YYYY-MM-DD').allow(null),
    result: Joi.string().allow(null),
    datetoGetjob: Joi.date().format('YYYY-MM-DD').allow(null),
    fileCV: Joi.string().required(),
    jobId:  Joi.string().required(),
    userId: Joi.string().required(),
    recruitId: Joi.string().required(),
    denyReason: Joi.string().allow(null)
});

export default candidateValidator;