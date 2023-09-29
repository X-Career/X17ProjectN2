import BaseJoi from "joi"
import DateJoi from "@joi/date"
const Joi = BaseJoi.extend(DateJoi)

const mailValidator = Joi.object({
    userEmail: Joi.string().required().min(3),
    candidateName: Joi.string().required().min(3),
    intro: Joi.string().required().min(3),
    linkTest: Joi.string().required().min(3),
    outro: Joi.string().required().min(3),
});

export default mailValidator;

