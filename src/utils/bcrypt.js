import bcrypt from 'bcrypt';

const saltRounds = 10;

export const handlerBcrypt = (str) => {
    return bcrypt.hashSync(str, saltRounds);
};
