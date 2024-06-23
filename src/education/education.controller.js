import { StatusCodes } from 'http-status-codes';
import { schemaEducation } from './education.validate.js';
import { validateSchema, resFormatResponse, jwtVerify, getDataUserIdFromToken } from '../utils/index.js';

import {
    handlerEducationCreate,
    handlerEducationUpdate,
    handlerEducationDelete,
    handlerCheckEducationId,
    handlerGetEducationById,
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
     * check token lấy candidateId
     */
    const { success: _flag, _id } = getDataUserIdFromToken(req);
    if (!_flag)
        return resFormatResponse(res, StatusCodes.BAD_REQUEST, {
            success: false,
            message: 'Token has problem!!!',
        });

    /**
     * save mới document
     */
    value.candidateId = _id;
    if (!value.isCurrent) {
        value.isCurrent = false;
    }
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
     * Kiểm tra candidateId và user có phải cùng 1 người hay không
     */
    const isOnePerson = _helper.checkUser(req, req.body.candidateId);
    if (!isOnePerson) {
        return resFormatResponse(res, StatusCodes.UNAUTHORIZED, {
            success: false,
            message: 'Không thể update thông tin không phải của chính mình',
        });
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

    const { success: validUser, _id: userID } = getDataUserIdFromToken(req);
    if (!validUser) {
        return resFormatResponse(res, StatusCodes.BAD_REQUEST, { success: false, message: 'Xảy ra lỗi, không lấy đc _id user' });
    }

    /**
     * delete
     */
    const { success, message, error, data } = await handlerEducationDelete(id, userID);
    resFormatResponse(res, StatusCodes[success ? 'OK' : 'BAD_REQUEST'], {
        success,
        message,
    });
};

const educationHelperFn = () => {
    const checkId = (id) => {
        if (!id) {
            return 'Field _id không được trống';
        }
        if (!handlerCheckEducationId(id)) {
            return 'Thông tin học vấn không tồn tại';
        }
        return '';
    };

    const checkUser = (req, candidateId) => {
        const { success, _id } = getDataUserIdFromToken(req);
        if (!success) return false;
        return _id === candidateId;
    };

    return {
        checkId,
        checkUser,
    };
};
