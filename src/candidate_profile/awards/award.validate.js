/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import Joi from 'joi';
import { _id, _arrayString, candidateId, _stringDefault } from '../../config/joi.config.js';

export const schemaAward = Joi.object({
    _id,
    name: _stringDefault({ min: 0, max: 50, title: 'Chứng chỉ' }),
    organization: _stringDefault({ min: 0, max: 50, title: 'Tổ chức' }),
    issueDate: Joi.number().required().messages({
        'any.required': 'Ngày nhận là bắt buộc',
        'number.empty': 'Ngày nhận không được trống',
    }),
    link: _stringDefault({ min: 0, max: 100, title: 'Liên kết' }),
    images: _arrayString,
    description: _stringDefault({ min: 0, max: 255, title: 'Mô tả' }),
    candidateId,
});
