/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { _consolog } from '../utils/index.js';

export const validateSchema = (props) => {
    /**
     * @return
     *  isValidated: boolean,
     *  value?: object,
     *  message?: object,
     *  error?: array
     *
     */

    const { schema = null, item = {} } = props;
    const message = 'Validation has errors';
    if (!schema || !item || !Object.keys(item).length) {
        return {
            isValidated: false,
            message,
        };
    }

    const validOpt = { abortEarly: false }; // Báo lỗi tất cả 1 lượt
    const { error, value } = schema.validate({ ...item }, validOpt);

    if (error) return { isValidated: false, message, errors: formatValidateError(error) };

    return {
        isValidated: true,
        value,
        message: '',
    };
};

const formatValidateError = (error) => {
    const { details = [] } = error;

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
