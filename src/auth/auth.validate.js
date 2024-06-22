import Joi from 'joi';

const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|;:,./<>?])[a-zA-Z0-9!@#$%^&*()_+{}|;:,./<>?]{5,}$',
);

export const schemaAuthRegister = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
        .trim()
        .strict()
        .required(),
    password: Joi.string().min(5).trim().strict().required(),
    repassword: Joi.ref('password'),
}).with('password', 'repassword');

export const schemaAuthLogin = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
        .trim()
        .strict()
        .required(),
    password: Joi.string().min(5).trim().strict().required(),
});
