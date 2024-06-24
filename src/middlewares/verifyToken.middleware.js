// comming soon

import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { TOKEN_SECRET, TOKEN_REFRESH } from '../config/process.config.js';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Access denied. No token provided.',
        });
    }

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
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Invalid token.' });
    }
};
