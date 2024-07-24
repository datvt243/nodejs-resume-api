/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { StatusCodes } from 'http-status-codes';
import { validateSchema, formatReturn, _throwError } from '../utils/index.js';

import { schemaAuthRegister, schemaAuthLogin } from './auth.validate.js';
import { handlerRegister, handlerLogin } from './auth.service.js';

/**
 * Chức năng Đăng ký mới
 */
export const authRegister = async (req, res) => {
    /**
     * validate dữ liệu đầu vào
     * { email, password, re-password } = req.body;
     */
    const { isValidated, value = {}, errors, message } = validateSchema({ schema: schemaAuthRegister, item: { ...req.body } });
    if (!isValidated) {
        return formatReturn(res, {
            statusCode: StatusCodes.UNAUTHORIZED,
            success: false,
            message,
            errors,
        });
    }

    /**
     * save mới document
     */
    try {
        const _result = await handlerRegister(value);
        return formatReturn(res, {
            statusCode: StatusCodes[_result?.success ? 'OK' : 'UNAUTHORIZED'],
            success: _result?.success || true,
            message: _result?.message || 'Đăng ký thành công',
            errors: null,
            data: null,
        });
    } catch (err) {
        _throwError(res, err);
    }
};

/**
 * Chức năng Đăng nhập
 */
export const authLogin = async (req, res) => {
    /**
     * validate date come from req
     */
    const { isValidated, value = {}, message, errors } = validateSchema({ schema: schemaAuthLogin, item: { ...req.query } });
    if (!isValidated) {
        return formatReturn(res, {
            statusCode: StatusCodes.UNAUTHORIZED,
            success: false,
            message,
            errors,
        });
    }

    /**
     * tiến hành Login
     */
    try {
        const _result = await handlerLogin({ email: value.email, password: value.password });
        return formatReturn(res, {
            statusCode: StatusCodes[_result?.success ? 'OK' : 'UNAUTHORIZED'],
            success: _result?.success || false,
            message: _result?.message || 'Login thất bại',
            errors: _result?.errors || [],
            data: _result?.data || null,
        });
    } catch (err) {
        _throwError(res, err);
    }
};

/**
 * Chức năng Refresh token
 */
export const authRefreshToken = async (req, res) => {
    // coming soon
};

/**
 * Chức năng Tạo mới RefreshToken
 */
export const authCreateRefreshToken = async (req, res) => {
    // coming soon
};
