import BaseJoi from "joi"
import DateJoi from "@joi/date"
const Joi = BaseJoi.extend(DateJoi)

const positionValidator = Joi.object({
    name: Joi.string().required().min(3).max(255),
    des: Joi.string().required().min(3),
    startTime: Joi.date().format('YYYY-MM-DD HH:mm').required(),
    endTime: Joi.date().format('YYYY-MM-DD HH:mm').required(),
    point: Joi.number().required(),
    question: Joi.string().required(),
    jobId:  Joi.string().required()
});

export default positionValidator;

