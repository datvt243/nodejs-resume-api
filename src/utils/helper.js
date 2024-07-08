/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { StatusCodes } from 'http-status-codes';

export const _throwError = (res, message) => {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error(message || 'something wrong bro!!!');
};

export const resBadRequest = (res, error) => {
    let errs = [];
    if (typeof error === 'string') {
        errs.push(error);
    } else if (typeof error === 'object') {
        if (Array.isArray(error)) {
            errs = error;
        } else {
            const { details = [] } = error;
            errs = details.map((i) => i?.message || '');
        }
    }

    res.status(StatusCodes.BAD_REQUEST).json({
        errors: errs,
        data: null,
    });
};

export const formatResponse = (props) => {
    /**
     * Chuẩn data trả về của API
     *  {
     *      success: boolean        // trạng thái
     *      message: string         // mess thành công or thất bại
     *      error: string | array   // danh sách lỗi
     *      data: null | object{ token: string, user: object{ _id, name } } //  data trả về gồm token và thông tin user
     *  }
     */
    const { type = '', success, message, errors = {}, data = {} } = props;

    const getData = (() => {
        if (!success) return null;
        let _data = null;

        if (type === 'register') return null;

        if (type === 'login') {
            const { token = '', user = null } = data;
            _data = { token, user };
        }

        return data;
    })();

    return {
        success,
        message,
        errors,
        data: getData,
    };
};
export const resFormatResponse = (res, status, props) => {
    res.status(status).json(formatResponse(props));
};

export const formatReturn = (res, props) => {
    const {
        success = false,
        message = '',
        errors = null,
        data = null,
        statusCode = null,
        statusCodeSuccess = 'OK',
        statusCodeFaild = 'BAD_REQUEST',
    } = props;

    const _statusCode = (() => {
        if (statusCode) return statusCode;
        const _success = statusCodeSuccess ? statusCodeSuccess : 'OK';
        const _faild = statusCodeFaild ? statusCodeFaild : 'BAD_REQUEST';
        return StatusCodes[success ? _success : _faild] || 500;
    })();

    return res.status(_statusCode).json(
        formatResponse({
            success,
            message,
            errors,
            data,
        }),
    );
};
