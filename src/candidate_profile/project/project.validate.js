/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import Joi from 'joi';
import {
    _id,
    company,
    position,
    candidateId,
    startDate,
    endDate,
    introduction,
    _stringDefault,
    _arrayString,
    _boolean,
} from '../../config/joi.config.js';

export const schemaProject = Joi.object({
    _id,
    name: _stringDefault({ min: 0, max: 50, title: 'Project' }),
    description: _stringDefault({ min: 0, max: 255, title: 'Mô tả' }),
    position: _stringDefault({ min: 0, max: 100, title: 'Vị trí' }),
    technologyUsed: _arrayString,
    companyId: Joi.string().trim().strict().messages(),
    images: _arrayString,
    link: _stringDefault({ min: 0, max: 100, title: 'Liên kết' }),
    isWorking: _boolean,
    startDate,
    endDate,
    candidateId,
});
