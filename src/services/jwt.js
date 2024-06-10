import jwt from 'jsonwebtoken';

const getSecretKey = () => {
    return 'secretKey';
};

export const jwtSign = (data) => {
    const SECRET = getSecretKey();
    const token = jwt.sign(data, SECRET, { expiresIn: '1d' });
    return token;
};

export const jwtVerify = (token) => {
    const SECRET = getSecretKey();
    const decoded = jwt.verify(token, SECRET);
    return decoded;
};
