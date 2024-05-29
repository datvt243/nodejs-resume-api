import bcrypt from 'bcrypt';

import Information from '../models/informationModel.js';
import { GENDER } from '../constant/constant.js';
import { _throwError } from '../utils/helper.js';

const saltRounds = 10;

const REQUEST = ['first_name', 'last_name', 'position', 'education', 'gender', 'birthday', 'email', 'phone'];

const checkDataInput = (record) => {
    const errors = [];
    for (const _key of REQUEST) {
        if (!record?.[_key]) {
            errors.push(`Thiếu ${_key}`);
        }
    }
    return errors;
};

const convertData = (data) => {
    let { gender, birthday } = data;
    birthday = +new Date(birthday);
    return {
        ...data,
        birthday,
    };
};

export const informationRegister = async (data) => {
    const { email, password } = data;

    /* mã hoá pwd */
    const hash = bcrypt.hashSync(password, saltRounds);
    if (!hash) return {};

    const document = await Information.create({
        email,
        password: hash,
    });
    return { document };
};

export const informationCreate = async (data) => {
    const errors = checkDataInput(data);
    if (errors.length) {
        return false;
    }

    const newData = convertData(data);

    const document = await Information.create(newData);
    return document ? true : false;
};

export const informationGetPageIndex = (req, res, next) => {
    res.render('information/index', {
        data: {
            _id: 'Information',
        },
    });
};

export const informationUpdateDocument = async (req, res, next) => {
    try {
        const { errors = [], document = null } = await informationCreate(req.body);
        if (errors.length) {
            res.status(REQUEST_STATUS.BAD).json({ errors });
            return;
        }
        res.status(REQUEST_STATUS.OK).json({
            ...document,
        });
    } catch (err) {
        /* res.status(REQUEST_STATUS.BAD).json({ ...err }); */
        _throwError(res, err);
    }
};
