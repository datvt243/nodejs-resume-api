import { StatusCodes } from 'http-status-codes';
import { NODE_ENV } from '../config/process.config.js';
import { _consolog } from '../utils/index.js';

export const errorsMiddelware = (err, req, res, next) => {
    _consolog('***** WARNING!!! Ops! we got a problem');

    res.status(StatusCodes.BAD_REQUEST).json({
        message: err.message,
        stack: NODE_ENV === 'development' ? err.stack : null,
    });
};
