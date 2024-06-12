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

    /* let _data = null;
    if (success && Object.keys(data || {}).length) {
        const { token = '', user = null } = data;
        _data = { token, user };
    } */

    const getData = (() => {
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

export const validateSchema = (props) => {
    /**
     * @return {
     *  isValidated: boolean,
     *  value?: object,
     *  message?: object,
     *  error?: array
     * }
     */

    const { schema = null, item = {} } = props;

    if (!schema || !item || !Object.keys(item).length) {
        return {
            isValidated: false,
            message: 'Lỗi validate',
        };
    }

    const { error, value } = schema.validate({ ...item }, { abortEarly: false });

    if (error) return { isValidated: false, message: 'Lỗi validate', error: formatValidateError(error) };

    return {
        isValidated: true,
        value,
    };
};

const formatValidateError = (error) => {
    const { details } = error;

    /* const fields = []; */
    const messages = {};

    for (const detail of details) {
        const _field = detail?.path[0],
            _mess = detail.message;

        /* _field && fields.push(_field); */
        _mess && (messages[_field] = _mess);
    }

    return messages;
};
