import Joi from 'joi';

import {
    getObject,
    _id,
    firstName,
    lastName,
    position,
    phone,
    candidateId,
    foreignLanguage,
    _arrayString,
} from '../config/joi.config.js';

export const schemaCandidatePatch = getObject({
    _id: _id,
    candidateId,
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
    personalSkills: _arrayString,
    foreignLanguage,
    socialMedia: Joi.object({
        github: Joi.string(),
        linkedin: Joi.string(),
        website: Joi.string(),
    }).messages({
        'object.base': 'Thông tin Social Network cần nhập vào là object',
    }),
});

export const schemaCandidate = getObject({
    _id: _id,
    firstName,
    lastName,
    phone,
    marital: Joi.boolean().required().messages({
        'any.required': 'Tình trạng hôn nhân không được rỗng',
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
    candidateId,
});

// personal information: thông tin cá nhân
// general information: thông tin chung
