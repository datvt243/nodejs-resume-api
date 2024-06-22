import { StatusCodes } from 'http-status-codes';
import { validateSchema, resBadRequest, resFormatResponse } from '../utils/index.js';

import { schemaAuthRegister, schemaAuthLogin } from './auth.validate.js';
import { register, login, isEmailAlreadyExists } from './auth.service.js';

export const authRegister = async (req, res, next) => {
    /**
     * validate dữ liệu đầu vào
     * { email, password, repassword } = req.body;
     */
    const { error, value } = schemaAuthRegister.validate(req.body);
    if (error) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, {
            type: 'register',
            success: false,
            message: 'Xảy ra lỗi',
            errors: error,
        });
        return;
    }

    /**
     * check email đã được đăng ký trước đó chưa
     */
    const emailHasExits = await isEmailAlreadyExists(value.email);
    if (emailHasExits) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, {
            type: 'register',
            success: false,
            message: 'Email đã tồn tại',
            errors: null,
        });
        return;
    }

    /**
     * save mới document
     */
    const { success, message } = await register(value);

    if (!success) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, { type: 'register', success: false, message: message, errors: null });
        return;
    }

    resFormatResponse(res, StatusCodes.CREATED, {
        type: 'register',
        success: true,
        message: 'Đăng ký thành công',
        errors: null,
        data: null,
    });
};

export const authLogin = async (req, res) => {
    /**
     * validate date come from req
     */

    const { isValidated, value = {} } = validateSchema({ schema: schemaAuthLogin, item: { ...req.query } });
    if (!isValidated) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, {
            type: 'login',
            success: false,
            message: 'Lỗi validate',
            errors: null,
        });
        return;
    }

    /* if (!Object.keys(value).length)  */

    const { success, message, errors, data } = await login({ email: value.email, password: value.password });

    if (!success) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, { type: 'login', success: false, message, errors: null, data: null });
        return;
    }
    resFormatResponse(res, StatusCodes.ACCEPTED, {
        type: 'login',
        success: true,
        message,
        errors,
        data,
    });
};
