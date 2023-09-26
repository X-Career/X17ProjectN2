import Joi from "joi";

const jobValidator = Joi.object({
    name: Joi.string().required().min(3).max(255),
    des: Joi.string().required().min(3),
    location: Joi.string().required().min(3).max(255),
    time: Joi.number().required(),
});

export default jobValidator;

