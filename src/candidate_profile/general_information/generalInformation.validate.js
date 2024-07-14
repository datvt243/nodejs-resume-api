/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import Joi from 'joi';

import {
    getObject,
    _id,
    firstName,
    lastName,
    position,
    phone,
    candidateId,
    foreignLanguages,
    _arrayString,
    _stringDefault,
} from '../../config/joi.config.js';

const _sub = {
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
    personalSkills: Joi.array().items({
        name: Joi.string(),
    }),
    foreignLanguages: foreignLanguages,
    socialMedia: Joi.object({
        github: Joi.string(),
        linkedin: Joi.string(),
        website: Joi.string(),
    }).messages({
        'object.base': 'Thông tin Social Network cần nhập vào là object',
    }),
};

export const schemaGeneralInformationPatch = getObject({
    _id: _id,
    ..._sub,
    /* candidateId,
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
    foreignLanguages,
    socialMedia: Joi.object({
        github: Joi.string(),
        linkedin: Joi.string(),
        website: Joi.string(),
    }).messages({
        'object.base': 'Thông tin Social Network cần nhập vào là object',
    }), */
});

export const schemaGeneralInformation = getObject({
    _id: _id,
    positionDesired: position,
    career: _stringDefault({ min: 3, max: 100, title: 'Nghề nghiệp' }),
    levelCurrent: _stringDefault({ min: 3, max: 100, title: 'Cấp bậc hiện tại' }),
    levelDesired: _stringDefault({ min: 3, max: 100, title: 'Cấp bậc mong muốn' }),
    salaryDesired: Joi.number().min(0).required().label('Lương mong muốn').messages({
        'any.required': 'Lương mong muốn không được trống',
        'number.min': `{#label} không được nhỏ hơn {#limit}`,
    }),
    education: _stringDefault({ min: 3, max: 100, title: 'Học vấn' }),
    yearsOfExperience: Joi.number().min(0).required().messages({
        'any.required': 'Số năm kinh nghiệm không được rỗng',
        'number.min': `Số năm kinh nghiệm không được nhỏ hơn {#limit}`,
    }),
    ..._sub,
});
