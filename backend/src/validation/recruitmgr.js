import BaseJoi from "joi"
import DateJoi from "@joi/date"
const Joi = BaseJoi.extend(DateJoi)

const recruitmgrValidator = Joi.object({
    nameRecruit: Joi.string().required().min(3),
    datetoStart: Joi.date().format('YYYY-MM-DD').required(),
    datetoEnd: Joi.date().format('YYYY-MM-DD').required(),
    candidates: Joi.array(),
});

export default recruitmgrValidator;

