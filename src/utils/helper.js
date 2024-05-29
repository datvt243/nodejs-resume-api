import { REQUEST_STATUS } from '../constant/constant.js';

export const _throwError = (res, message) => {
    res.status(REQUEST_STATUS.BAD_SERVER);
    throw new Error(message || 'something wrong bro!!!');
};
