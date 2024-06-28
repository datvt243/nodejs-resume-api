/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import Joi from 'joi';
import {
    _id,
    _boolean,
    _arrayString,
    company,
    position,
    candidateId,
    startDate,
    endDate,
    introduction,
} from '../../config/joi.config.js';

export const schemaExperience = Joi.object({
    _id,
    company,
    position,
    startDate,
    endDate,
    isCurrent: _boolean,
    description: introduction,
    candidateId,
    skills: _arrayString,
});
