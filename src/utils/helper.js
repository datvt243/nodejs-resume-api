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
    const { type = '', success, message, errors, data = {} } = props;

    let _data = null;
    if (success && Object.keys(data || {}).length) {
        const { token = '', user = null } = data;
        _data = { token, user };
    }

    return {
        success,
        message,
        errors,
        data: type === 'register' ? null : _data,
    };
};
export const resFormatResponse = (res, status, props) => {
    res.status(status).json(formatResponse(props));
};
