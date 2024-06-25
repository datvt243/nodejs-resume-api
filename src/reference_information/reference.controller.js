import { StatusCodes } from 'http-status-codes';
import { schemaReference } from './reference.validate.js';
import { validateSchema, resFormatResponse } from '../utils/index.js';

import {
    handlerReferenceCreate,
    handlerReferenceUpdate,
    handlerReferenceDelete,
    handlerCheckExperienceId,
} from './reference.service.js';

export const referenceCreate = async (req, res) => {
    /**
     * validate data gửi lên
     */
    const { isValidated, value = {}, error: errValid } = validateSchema({ schema: schemaReference, item: { ...req.body } });
    if (!isValidated) {
        return resFormatResponse(res, StatusCodes.BAD_REQUEST, {
            success: false,
            message: 'Lỗi validate _',
            errors: errValid,
        });
    }

    /**
     * save mới document
     */
    const { success, message, error, data = {} } = await handlerReferenceCreate(value);
    resFormatResponse(res, StatusCodes[success ? 'OK' : 'BAD_REQUEST'], {
        success,
        message,
        errors: error,
        data,
    });
};

export const referenceUpdate = async (req, res) => {
    const _helper = _helperFn();

    /**
     * Kiểm tra có _id hay không, và _id có tồn tại trong db hay không
     */
    const _message = _helper.checkId(req.body._id);
    if (_message) {
        return resFormatResponse(res, StatusCodes.BAD_REQUEST, { success: false, message: _message });
    }

    /**
     * validate data gửi lên
     */
    const { isValidated, value = {}, error: errValid } = validateSchema({ schema: schemaReference, item: { ...req.body } });
    if (!isValidated) {
        return resFormatResponse(res, StatusCodes.BAD_REQUEST, {
            success: false,
            message: 'Lỗi validate',
            errors: errValid,
        });
    }

    /**
     * update document
     */
    !value.isCurrent && (value.isCurrent = false);
    const { success, message, error, data = {} } = await handlerReferenceUpdate(value);
    resFormatResponse(res, StatusCodes[success ? 'OK' : 'BAD_REQUEST'], {
        success,
        message,
        errors: error,
        data,
    });
};

export const referenceDelete = async (req, res) => {
    const { id = '' } = req.params;
    if (!id) {
        return resFormatResponse(res, StatusCodes.BAD_REQUEST, { success: false, message: 'ID không được trống' });
    }

    const { success, message, error, data } = await handlerReferenceDelete(id, req.body.candidateId);
    resFormatResponse(res, StatusCodes[success ? 'OK' : 'BAD_REQUEST'], {
        success,
        message,
        data: null,
        error,
    });
};

const _helperFn = () => {
    return {
        checkId: (id) => {
            if (!id) return 'Field _id không được trống';
            if (!handlerCheckExperienceId(id)) return 'Thông tin Kinh nghiệm làm việc không tồn tại';
            return '';
        },
    };
};
