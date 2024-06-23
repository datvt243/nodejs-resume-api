import Joi from 'joi';

export const schemaEducation = Joi.object({
    _id: Joi.string(),
    shool: Joi.string().min(10).max(255).trim().strict().required().messages({
        'any.required': 'Trường không được rỗng',
        'string.min': 'Trường có ít nhất 10 ký tự',
    }),
    major: Joi.string().min(3).max(255).trim().strict().required().messages({
        'any.required': 'Ngành học không được rỗng',
        'string.min': 'Ngành học có ít nhất 3 ký tự',
    }),
    startDate: Joi.number().required().messages({
        'any.required': 'Ngày bắt đầu không được rỗng',
        'string.min': 'Ngày bắt đầu có ít nhất 3 ký tự',
    }),
    endDate: Joi.number().required().greater(Joi.ref('startDate')).messages({
        'any.required': 'Ngày kết thúc không được rỗng',
        'number.greater': 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
    }),
    isCurrent: Joi.boolean(),
    description: Joi.string().trim().strict().required().messages({
        'any.required': 'Mô tả không được rỗng',
        'string.min': 'Mô tả có ít nhất 3 ký tự',
    }),
    candidateId: Joi.string().messages({
        'any.required': 'Mã ứng viên không được rỗng',
        'string.min': 'Mã ứng viên có ít nhất 3 ký tự',
    }),
});
