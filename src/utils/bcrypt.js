/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import bcrypt from 'bcrypt';

const saltRounds = 10;

export const handlerBcrypt = (str) => {
    return bcrypt.hash(str, saltRounds);
};

export const generateSalt = (pass) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pass, salt);
    return hash || pass;
};

export const compareHash = async (str, hash) => {
    if (!str || !hash) return false;
    const match = await bcrypt.compare(str, hash);
    return match;
};
