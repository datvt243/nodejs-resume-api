/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

export * from './bcrypt.js';
export * from './helper.js';
export * from './jwt.js';
export * from './valid.js';

import { jwtVerify } from './jwt.js';
import { TOKEN_SECRET } from '../config/process.config.js';

export const _consolog = (props) => {
    /* 
    console.warn(): In ra cảnh báo.
	console.error(): In ra lỗi.
	console.table(): In ra bảng dữ liệu.
	console.time() và console.timeEnd(): Đo thời gian thực hiện của một đoạn mã. 
    */

    if (!props) return;

    if (typeof props === 'string') return console.log(props);
    if (Array.isArray(props)) {
        console.group();
        props.forEach((el) => {
            console.log({ el });
        });
        console.groupEnd();
        return;
    }

    const { text = '', type = 'warn' } = props;
    const obj = {
        warn: (t) => console.warn(t),
        error: (t) => console.error(t),
        table: (t) => console.table(t),
    };
    return obj?.type ? obj[type]?.(text) : console.log(text);
};

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
