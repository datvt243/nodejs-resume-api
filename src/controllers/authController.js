import { StatusCodes } from 'http-status-codes';
import { GENDER } from '../constant/constant.js';
import { resBadRequest } from '../utils/helper.js';

import Experience from '../models/experienceModel.js';

import { schemaAuthLoginAndRegister } from '../validations/authValidate.js';
import { registerNewAccount, isEmailAlreadyExists } from '../services/authService.js';

export const authGetPageRegister = (req, res, next) => {
    res.render('register', {
        data: { id: 'nice' },
        errors: [],
    });
};
export const authGetPageLogin = (req, res, next) => {
    res.render('login', {
        data: null,
    });
};
export const authRegister = async (req, res, next) => {
    const { email, password, repassword } = req.body;

    /**
     * validate dữ liệu đầu vào
     */
    const { error, value } = schemaAuthLoginAndRegister.validate({
        email,
        password,
        repassword,
    });

    /**
     * validate lỗi trả về errors
     */
    if (error) {
        resBadRequest(res, error);
        return;
    }

    /**
     * check email đã được đăng ký trước đó chưa
     */
    const emailHasExits = await isEmailAlreadyExists(value.email);
    if (emailHasExits) {
        resBadRequest(res, 'Email đã tồn tại');
        return;
    }

    /**
     * save mới document
     */
    const { error: registerFaild, document } = registerNewAccount(value);
    if (registerFaild) {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: ['Ops!!! Something wrong'],
            data: null,
        });
    }

    res.status(StatusCodes.OK).json({
        errors: null,
        data: document || {},
    });
};
