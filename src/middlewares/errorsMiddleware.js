import 'dotenv/config';
import { REQUEST_STATUS } from '../constant/constant.js';

export const errorsMiddelware = (err, req, res, next) => {
    console.log('Ops! we got a problem');

    const { NODE_ENV } = process.env;
    res.status(REQUEST_STATUS.BAD_SERVER).json({
        message: err.message,
        stack: NODE_ENV === 'development' ? err.stack : null,
    });
};
