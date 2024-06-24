import { StatusCodes } from 'http-status-codes';
import { schemaEducation } from './education.validate.js';
import { validateSchema, resFormatResponse, jwtVerify } from '../utils/index.js';

import {
    handlerEducationCreate,
    handlerEducationUpdate,
    handlerEducationDelete,
    handlerCheckEducationId,
} from './education.service.js';

export const educationCreate = async (req, res) => {
    /**
     * validate data gửi lên
     */
    const { isValidated, value = {}, error: errValid } = validateSchema({ schema: schemaEducation, item: { ...req.body } });
    if (!isValidated) {
        return resFormatResponse(res, StatusCodes.BAD_REQUEST, {
            success: false,
            message: 'Lỗi validate',
            errors: errValid,
        });
    }

    /**
     * save mới document
     */
    !value.isCurrent && (value.isCurrent = false);
    const { success, message, error, data = {} } = await handlerEducationCreate(value);

    resFormatResponse(res, StatusCodes[success ? 'OK' : 'BAD_REQUEST'], {
        success,
        message,
        errors: error,
        data,
    });
};

export const educationUpdate = async (req, res) => {
    const _helper = educationHelperFn();

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
    const { isValidated, value = {}, error: errValid } = validateSchema({ schema: schemaEducation, item: { ...req.body } });
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
    if (!value.isCurrent) {
        value.isCurrent = false;
    }
    const { success, message, error, data = {} } = await handlerEducationUpdate(value);
    resFormatResponse(res, StatusCodes[success ? 'OK' : 'BAD_REQUEST'], {
        success,
        message,
        errors: error,
        data,
    });
};

export const educationDelete = async (req, res) => {
    const { id = '' } = req.params;
    if (!id) {
        return resFormatResponse(res, StatusCodes.BAD_REQUEST, { success: false, message: 'ID không được trống' });
    }

    /**
     * delete
     */
    const { success, message, error, data } = await handlerEducationDelete(id, req.body.candidateId);
    resFormatResponse(res, StatusCodes[success ? 'OK' : 'BAD_REQUEST'], {
        success,
        message,
    });
};

const educationHelperFn = () => {
    const checkId = (id) => {
        if (!id) return 'Field _id không được trống';
        if (!handlerCheckEducationId(id)) return 'Thông tin học vấn không tồn tại';
        return '';
    };

    return {
        checkId,
    };
};
