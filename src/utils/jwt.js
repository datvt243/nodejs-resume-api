import jwt from 'jsonwebtoken';

const getSecretKey = () => {
    return 'secretKey';
};

export const jwtSign = (data, secretKey) => {
    const token = jwt.sign(data, secretKey, { expiresIn: '1d' });
    return token;
};

export const jwtVerify = (token, secretKey) => {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
};
