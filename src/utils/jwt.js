/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import jwt from 'jsonwebtoken';

const getSecretKey = () => {
    return 'secretKey';
};

export const jwtSign = (data, secretKey, props = {}) => {
    const { expiresIn = '1d' } = props;
    const token = jwt.sign(data, secretKey, { expiresIn });
    return token;
};

export const jwtVerify = (token, secretKey) => {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
};
