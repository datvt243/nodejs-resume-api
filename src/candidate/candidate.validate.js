import Joi from 'joi';

import { _id, firstName, lastName, position, phone, candidateId, _arrayString } from '../config/joi.config.js';

import { phoneRegex } from '../config/regex.config.js';

export const schemaCandidateProfessionalSkills = Joi.object({
    _id: _id,
    professionalSkills: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().required().messages({ 'any.required': 'Tên kỹ năng không được rỗng' }),
                exp: Joi.number().required().messages({ 'any.required': 'Số năm kinh nghiệm không được rỗng' }),
            }).messages({
                'object.base': 'Kỹ năng chuyên môn cần nhập vào là object',
            }),
        )
        .messages({
            'array.base': 'Kỹ năng chuyên môn cần nhập vào là array',
        }),
});

export const schemaCandidate = Joi.object({
    _id: _id,
    firstName,
    lastName,
    position,
    phone,
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
    introduction: Joi.string().required().messages({
        'any.required': 'Giới thiệu bản thân không được rỗng',
    }),
    socialMedia: Joi.object({
        github: Joi.string(),
        linkedin: Joi.string(),
        website: Joi.string(),
    }),
    yearsOfExperience: Joi.number().required().messages({
        'any.required': 'Số năm kinh nghiệm không được rỗng',
    }),

    foreignLanguage: Joi.array().items({
        name: Joi.string(),
        level: Joi.string(),
    }),

    personalSkills: _arrayString,
    professionalSkills: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().required().messages({ 'any.required': 'Tên kỹ năng không được rỗng' }),
                exp: Joi.number().required().messages({ 'any.required': 'Số năm kinh nghiệm không được rỗng' }),
            }).messages({
                'object.base': 'Kỹ năng chuyên môn cần nhập vào là object',
            }),
        )
        .messages({
            'array.base': 'Kỹ năng chuyên môn cần nhập vào là array',
        }),
    candidateId,
});

// personal information: thông tin cá nhân
// general information: thông tin chung
