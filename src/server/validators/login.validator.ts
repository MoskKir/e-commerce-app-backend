import Joi from "@hapi/joi";

const loginSchema: Joi.ObjectSchema = Joi.object({
    email: Joi.string()
        .required()
        .trim(),

    password: Joi.string()
        .min(5)
        .required()
        .trim()
});


export default loginSchema;