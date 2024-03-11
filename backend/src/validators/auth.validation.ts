import Joi from 'joi';

const loginValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const registerValidate = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const ReportByIdValidate = Joi.object({
    reportId: Joi.string().required(),
});
const getReportValidate = Joi.object({
    searchPage: Joi.string().required(),
    searchQuery: Joi.string().required(),
});

export {
    loginValidate,
    registerValidate,
    ReportByIdValidate,
    getReportValidate
}