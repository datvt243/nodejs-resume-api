import { StatusCodes } from 'http-status-codes';
import { resBadRequest, resFormatResponse } from '../utils/helper.js';

import { schemaAuthRegister, schemaAuthLogin } from '../validations/authValidate.js';
import { register, login, isEmailAlreadyExists } from '../services/authService.js';

export const authRegister = async (req, res, next) => {
    /**
     * validate dữ liệu đầu vào
     * { email, password, repassword } = req.body;
     */
    const { error, value } = schemaAuthRegister.validate(req.body);
    if (error) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, { success: false, message: 'Xảy ra lỗi', errors: error });
        return;
    }

    /**
     * check email đã được đăng ký trước đó chưa
     */
    const emailHasExits = await isEmailAlreadyExists(value.email);
    if (emailHasExits) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, { success: false, message: 'Email đã tồn tại', errors: null });
        return;
    }

    /**
     * save mới document
     */
    const { success, message } = await register(value);

    if (!success) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, { success: false, message: message, errors: null });
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
    const { email, password } = req.query;
    const { error, value } = schemaAuthLogin.validate({
        email,
        password,
    });

    if (error) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, {
            success: false,
            message: 'Xảy ra lỗi, thông tin đăng nhập không chính xác',
            errors: null,
        });
        return;
    }

    const { success, message, errors, data } = await login({ email: value.email, password: value.password });

    if (!success) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, { success: false, message, errors: null, data: null });
        return;
    }
    resFormatResponse(res, StatusCodes.ACCEPTED, {
        success: true,
        message,
        errors,
        data,
    });
};
