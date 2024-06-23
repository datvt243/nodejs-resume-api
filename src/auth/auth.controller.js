import { StatusCodes } from 'http-status-codes';
import { validateSchema, resFormatResponse } from '../utils/index.js';

import { schemaAuthRegister, schemaAuthLogin } from './auth.validate.js';
import { handlerRegister, handlerLogin } from './auth.service.js';

/**
 * Chức năng Đăng ký mới
 */
export const authRegister = async (req, res) => {
    /**
     * validate dữ liệu đầu vào
     * { email, password, repassword } = req.body;
     */
    const { isValidated, value = {}, error } = validateSchema({ schema: schemaAuthRegister, item: { ...req.body } });
    if (!isValidated) {
        return resFormatResponse(res, StatusCodes.UNAUTHORIZED, {
            type: 'register',
            success: false,
            message: 'Lỗi validate',
            errors: error,
        });
    }

    /**
     * save mới document
     */
    const { success, message } = await handlerRegister(value);
    resFormatResponse(res, StatusCodes[success ? 'OK' : 'UNAUTHORIZED'], {
        type: 'register',
        success: success,
        message,
        errors: null,
        data: null,
    });
};

/**
 * Chức năng Đăng nhập
 */
export const authLogin = async (req, res) => {
    /**
     * validate date come from req
     */
    const { isValidated, value = {} } = validateSchema({ schema: schemaAuthLogin, item: { ...req.query } });
    if (!isValidated) {
        return resFormatResponse(res, StatusCodes.UNAUTHORIZED, {
            type: 'login',
            success: false,
            message: 'Lỗi validate',
            errors: null,
        });
    }

    /**
     * tiến hành Login
     */
    const { success, message, errors = null, data = null } = await handlerLogin({ email: value.email, password: value.password });
    resFormatResponse(res, StatusCodes[success ? 'OK' : 'UNAUTHORIZED'], {
        type: 'login',
        success: success,
        message,
        errors,
        data,
    });
};

/**
 * Chức năng Refresh token
 */
export const authRefeshToken = async (req, res) => {
    // coming soon
};
