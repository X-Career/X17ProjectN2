import Joi from "joi";

const positionValidator = Joi.object({
    name: Joi.string().required().min(3).max(255),
    salary: Joi.number().required(),
    jobId:  Joi.string().required()
});

export default positionValidator;

