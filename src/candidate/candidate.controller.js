import { StatusCodes } from 'http-status-codes';
import { resBadRequest, resFormatResponse, _throwError, validateSchema } from '../utils/index.js';

import { schemaCandidate, schemaCandidateProfessionalSkills } from './candidate.validate.js';
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
};

export const candidateUpdateProfessionalSkills = async (req, res) => {
    /**
     * validate data come from req.body
     */
    const {
        isValidated,
        value,
        error: _error,
    } = validateSchema({ schema: schemaCandidateProfessionalSkills, item: { ...req.body } });
    if (!isValidated) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, { success: false, message: 'Xảy ra lỗi', errors: _error });
        return;
    }

    /**
     * update data
     */
    const { success, message, data = null, error = [] } = await handlerCandidateUpdatePatch(value);
    resFormatResponse(res, StatusCodes[success ? 'OK' : 'UNAUTHORIZED'], {
        success,
        message,
        errors: error,
        data,
    });
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

    const { success, data, message } = await handlerGetAboutMe(email);
    resFormatResponse(res, success ? StatusCodes.OK : StatusCodes.BAD_REQUEST, {
        success,
        message,
        data,
    });
};
