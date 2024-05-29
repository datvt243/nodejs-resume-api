import Experience from '../models/experienceModel.js';
import { GENDER } from '../constant/constant.js';
import { _throwError } from '../utils/helper.js';

import { informationRegister } from '../controllers/informationController.js';

export const authGetPageRegister = (req, res, next) => {
    res.render('register', {
        data: { id: 'nice' },
        errors: [],
    });
};
export const authGetPageLogin = (req, res, next) => {
    res.render('login', {
        data: null,
    });
};
export const authRegister = async (req, res, next) => {
    const { email, password, repassword } = req.body;

    const { flag, errors } = (() => {
        let flag = true,
            errors = [];

        if (!email) {
            flag = false;
            errors.push('Vui lòng nhập email');
        }

        if (!password) {
            flag = false;
            errors.push('Vui lòng nhập lại mật khẩu');
        } else if (!(password === repassword)) {
            flag = false;
            errors.push('Nhập lại mật khẩu không chính xác');
        }

        return {
            flag,
            errors,
        };
    })();

    if (flag) {
        const success = await informationRegister({ email, password });
        if (success) {
            res.redirect('/login');
        } else {
            res.status(REQUEST_STATUS.BAD).json('register', {
                errors: ['Ops!!! Something wrong'],
                data: null,
            });
        }
        return;
    }
    res.status(REQUEST_STATUS.BAD).json({
        errors,
        data: null,
    });
};
