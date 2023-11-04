import BaseJoi from "joi"
import DateJoi from "@joi/date"
const Joi = BaseJoi.extend(DateJoi)

const jobValidator = Joi.object({
    name: Joi.string().required().min(3).max(255),
    des: Joi.string().required().min(3),
    req: Joi.string().required().min(3),
    location: Joi.string().required().min(3).max(255),
    position: Joi.string().required().min(3).max(255),
    salary: Joi.number().required(),
    recruitId: Joi.string().required(),
    candidates: Joi.array(),
    _id: Joi.string(), 
    createdAt: Joi.date(), 
    updatedAt: Joi.date(), 
});
export default jobValidator;

