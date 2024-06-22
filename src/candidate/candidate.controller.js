import { StatusCodes } from 'http-status-codes';
import { resBadRequest, resFormatResponse, _throwError, validateSchema } from '../utils/index.js';

import { schemaCandidate } from './candidate.validate.js';
import {
    handlerCandidateUpdate,
    handlerCandidateGetInformationByEmail,
    handlerCandidateGetInformationById,
} from './candidate.service.js';

export const candidateGetInformationById = async (req, res) => {
    const { id = '', email = '' } = req.params;
    const doc = await handlerCandidateGetInformationById(id);

    const _flag = !!doc;
    resFormatResponse(res, _flag ? StatusCodes.OK : StatusCodes.BAD_REQUEST, {
        success: _flag,
        message: _flag ? '' : 'Không tìm thấy người dùng',
        errors: [],
        data: doc,
    });
};

export const candidateGetInformationByEmail = async (req, res) => {
    const { email = '' } = req.params;
    const doc = await handlerCandidateGetInformationByEmail(email);

    const _flag = !!doc;
    resFormatResponse(res, _flag ? StatusCodes.OK : StatusCodes.BAD_REQUEST, {
        success: _flag,
        message: _flag ? '' : 'Không tìm thấy người dùng',
        errors: [],
        data: doc,
    });
};

export const candidateUpdate = async (req, res) => {
    /**
     * validate data come from req.body
     */
    const { isValidated, value, error: _error } = validateSchema({ schema: schemaCandidate, item: { ...req.body } });
    if (!isValidated) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, { success: false, message: 'Xảy ra lỗi', errors: _error });
        return;
    }

    /**
     * update data
     */
    const { success, message, data = null, error = [] } = await handlerCandidateUpdate(value);
    resFormatResponse(res, StatusCodes[success ? 'OK' : 'UNAUTHORIZED'], {
        success,
        message,
        errors: error,
        data,
    });

    /* if (!success) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, { success: false, message: message, errors: error });
        return;
    }

    resFormatResponse(res, StatusCodes.OK, {
        success: true,
        message,
        errors: error,
        data,
    }); */
};
