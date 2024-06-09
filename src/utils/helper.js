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
