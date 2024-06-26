import { StatusCodes } from 'http-status-codes';
import { _consolog, formatReturn, resBadRequest, resFormatResponse, _throwError, validateSchema } from '../utils/index.js';

import { schemaCandidate, schemaCandidatePatch } from './candidate.validate.js';
import {
    handlerCandidateUpdate,
    handlerCandidateUpdatePatch,
    handlerCandidateGetInformationByEmail,
    handlerCandidateGetInformationById,
    handlerGetAboutMe,
} from './candidate.service.js';

export const candidateGetInformationById = async (req, res) => {
    const { id = '', email = '' } = req.params;
    const doc = await handlerCandidateGetInformationById(id);

    const _flag = !!doc;
    return formatReturn(res, { success: _flag, message: _flag ? '' : 'Không tìm thấy người dùng', data: doc });
};

export const candidateGetInformationByEmail = async (req, res) => {
    const { email = '' } = req.params;
    const doc = await handlerCandidateGetInformationByEmail(email);

    const _flag = !!doc;
    return formatReturn(res, { success: _flag, message: _flag ? '' : 'Không tìm thấy người dùng', data: doc });
};

export const candidateUpdate = async (req, res) => {
    /**
     * validate data come from req.body
     */
    const { isValidated, value, error: errors } = validateSchema({ schema: schemaCandidate, item: { ...req.body } });
    if (!isValidated)
        return formatReturn(res, { statusCode: StatusCodes.UNAUTHORIZED, success: false, message: 'Xảy ra lỗi', errors });

    /**
     * update data
     */
    const _result = await handlerCandidateUpdate(value);
    return formatReturn(res, { ..._result });
};

export const candidateUpdateFields = async (req, res) => {
    /**
     * validate data come from req.body
     */
    const {
        isValidated: success,
        value,
        error: errors,
    } = validateSchema({ schema: schemaCandidatePatch, item: { ...req.body } });

    if (!success)
        return formatReturn(res, {
            statusCode: StatusCodes.UNAUTHORIZED,
            message: 'Lỗi validate',
            success,
            errors,
        });

    const _result = await handlerCandidateUpdatePatch(value);
    return formatReturn(res, { ..._result });
};

export const getAboutMe = async (req, res) => {
    /**
     *
     */
    const { email = '' } = req.params;
    if (!email) {
        res.status(400).json({
            success: false,
            message: 'Không tìm thấy email',
        });
    }

    const _result = await handlerGetAboutMe(email);
    return formatReturn(res, { ..._result });
};
