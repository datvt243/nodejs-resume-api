import { StatusCodes } from 'http-status-codes';
import { NODE_ENV } from '../config/process.config.js';
import { _consolog } from '../utils/index.js';

export const errorsMiddelware = (err, req, res, next) => {
    _consolog('***** WARNING!!! Ops! we got a problem');

    let _message = '',
        _code = StatusCodes.BAD_REQUEST;

    if (err instanceof ReferenceError) {
        _message = err.message;
    } else {
        _message = 'Lỗi không xác định';
        _code = 404;
    }

    res.status(_code || 404).json({
        message: _message,
        stack: NODE_ENV === 'development' ? err.stack : null,
    });
};
