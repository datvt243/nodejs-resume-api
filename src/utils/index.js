export * from './bcrypt.js';
export * from './helper.js';
export * from './jwt.js';
export * from './valid.js';

import { jwtVerify } from './jwt.js';
import { TOKEN_SECRET } from '../config/process.config.js';

export const getDataUserIdFromToken = (req) => {
    let success = false,
        _id = null;

    const token = req.header('Authorization')?.replace('Bearer ', '');

    try {
        const { _id: id, exp = null } = jwtVerify(token, TOKEN_SECRET);

        _id = id;
        success = true;
    } catch (err) {
        success = false;
    }

    return {
        success,
        _id,
    };
};
