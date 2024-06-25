import Joi from 'joi';

import { phoneRegex } from '../config/regex.config.js';

export const _id = Joi.string();

export const candidateId = Joi.string();

export const email = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
    .trim()
    .strict()
    .required()
    .messages({
        'any.required': 'Email là bắt buộc',
        'string.empty': 'Email không được rỗng',
        'string.email': 'Email không đúng định dạng',
    });
export const password = Joi.string().min(5).trim().strict().required().messages({
    'any.required': 'Password là bắt buộc',
    'string.empty': 'Password không được rỗng',
});

export const firstName = Joi.string().min(3).max(15).trim().strict().required().messages({
    'any.required': 'Họ là bắt buộc',
    'string.min': 'Họ có ít nhất 3 ký tự',
    'string.max': 'Họ có ít nhất 15 ký tự',
    'string.empty': 'Họ không được trống',
});

export const lastName = Joi.string().min(3).max(35).trim().strict().required().messages({
    'any.required': 'Tên là bắt buộc',
    'string.min': 'Tên có ít nhất 3 ký tự',
    'string.max': 'Tên có ít nhất 35 ký tự',
    'string.empty': 'Tên không được trống',
});

export const fullName = Joi.string().min(3).max(50).trim().strict().required().messages({
    'any.required': 'Họ tên là bắt buộc',
    'string.min': 'Họ tên có ít nhất 3 ký tự',
    'string.max': 'Họ tên có ít nhất 20 ký tự',
    'string.empty': 'Họ tên không được trống',
});

export const company = Joi.string().min(3).max(100).trim().strict().required().messages({
    'any.required': 'Tên công ty là bắt buộc',
    'string.min': 'Tên công ty có ít nhất 3 ký tự',
    'string.max': 'Tên công ty có ít nhất 100 ký tự',
    'string.empty': 'Tên công ty tên không được trống',
});

export const position = Joi.string().min(3).max(100).trim().strict().required().messages({
    'any.required': 'Vị trí là bắt buộc',
    'string.min': 'Vị trí ty có ít nhất 3 ký tự',
    'string.max': 'Vị trí ty có ít nhất 100 ký tự',
    'string.empty': 'Vị trí ty tên không được trống',
});

export const phone = Joi.string().pattern(phoneRegex).trim().strict().required().messages({
    'any.required': 'Số điện thoại là bắt buộc',
    'string.pattern.base': 'Số điện thoại {#value} không hợp lệ. Số điện thoại phải có 10-11 chữ số',
    'string.empty': 'Số điện thoại không được để trống',
});

export const introduction = Joi.string().required().messages({
    'any.required': 'Giới thiệu bản thân không được rỗng',
});

export const startDate = Joi.number().required().messages({
    'any.required': 'Ngày bắt đầu là bắt buộc',
    'number.empty': 'Ngày bắt đầu không được trống',
});
export const endDate = Joi.number().greater(Joi.ref('startDate')).messages({
    'number.greater': 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
});

export const _boolean = Joi.boolean();
export const _arrayString = Joi.array().items(Joi.string());
