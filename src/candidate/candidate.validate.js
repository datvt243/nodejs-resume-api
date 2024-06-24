import Joi from 'joi';

const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|;:,./<>?])[a-zA-Z0-9!@#$%^&*()_+{}|;:,./<>?]{5,}$',
);

export const schemaCandidate = Joi.object({
    _id: Joi.string().required(),
    first_name: Joi.string().min(1).max(255).trim().strict().required().messages({
        'any.required': 'Họ không được rỗng',
        'string.min': 'Họ có ít nhất 3 ký tự',
    }),
    last_name: Joi.string().min(3).max(255).trim().strict().required().messages({
        'any.required': 'Tên không được rỗng',
        'string.min': 'Tên có ít nhất 3 ký tự',
    }),
    position: Joi.string().min(3).max(255).trim().strict().required().messages({
        'any.required': 'Vị trí không được rỗng',
        'string.min': 'Vị trí có ít nhất 3 ký tự',
    }),
    education: Joi.string().min(3).max(255).trim().strict().required().messages({
        'any.required': 'Học vấn không được rỗng',
    }),
    gender: Joi.boolean().required().messages({
        'any.required': 'Giới tính không được rỗng',
    }),
    birthday: Joi.number().min(0).required().messages({
        'any.required': 'Ngày sinh không được rỗng',
    }),
    address: Joi.string().min(0).max(255).required().messages({
        'any.required': 'Địa chỉ không được rỗng',
    }),
    phone: Joi.string().min(0).max(255).required().messages({
        'any.required': 'SĐT không được rỗng',
    }),
    introduction: Joi.string().required().messages({
        'any.required': 'Giới thiệu bản thân không được rỗng',
    }),

    socialMedia: Joi.object({
        github: Joi.string(),
        linkedin: Joi.string(),
        website: Joi.string(),
    }),
    educationId: Joi.string(),
    experienceId: Joi.string(),

    candidateId: Joi.string(),
});
