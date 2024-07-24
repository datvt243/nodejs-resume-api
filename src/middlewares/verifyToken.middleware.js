// comming soon

/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { TOKEN_SECRET, TOKEN_REFRESH } from '../config/process.config.js';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Access denied. No token provided.',
            invalidToken: true,
        });
    }

    verify(token, req, res, next);
};

export const verifyTokenByQuery = (req, res, next) => {
    const { token } = req.query;

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Access denied. No token provided.',
            invalidToken: true,
        });
    }

    verify(token, req, res, next);
};

function verify(token, req, res, next) {
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const { _id } = decoded;

        /**
         * thêm candidateId vào body
         */
        req.body.candidateId = _id;

        /** next */
        next();
        /**  */
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Invalid token.', invalidToken: true });
    }
}
