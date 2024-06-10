import { schemaAuthLogin } from '../validations/authValidate.js';
import { informationRegister } from '../controllers/informationController.js';
import { jwtSign } from '../services/jwt.js';
import Candidate from '../models/informationModel.js';

import { GenerateSalt, compareHash } from '../utils/bcrypt.js';

export const isEmailAlreadyExists = async (email) => {
    const find = await Candidate.findOne({ email });
    return find ? true : false;
};

export const register = async (item) => {
    /**
     * FLOW
     *  1. lấy thông tin input [email, pwd, re-pwd]
     *  2. validate thông tin
     *      2.1. 'false' -> return error
     *  3. mã hoá pwd
     *  4. lưu thông tin
     */
    const { email, password, repassword } = item;
    /**
     * validate data trước khi lưu vào database
     */
    const { error, value } = schemaAuthLogin.validate(
        {
            email,
            password,
        },
        { abortEarly: false },
    );

    if (error) return { success: false, message: 'Lỗi validate' };

    const bcryptPwd = GenerateSalt(value.password);
    const document = await Candidate.create({
        email: value.email,
        password: bcryptPwd,
    });
    return { success: true, message: 'Thêm mới thành công' };
};

export const login = async (data = {}) => {
    /**
     * FLOW
     * 1. find user by email
     * 2. check
     *      2.1. ko tìm thấy return error
     *      2.2. tìm thấy -> lấy ra pwd (đã đc hash)
     * 3. compare pwd (input) và pwd (hash)
     *      3.1. 'false' -> return error
     *      3.2. 'true' -> return [token, user]
     */

    const { email, password } = data;

    const findUserByEmail = await Candidate.findOne({ email });

    if (!findUserByEmail) {
        return {
            success: false,
            message: 'email không tồn tại',
        };
    }

    const { password: pwdHash } = findUserByEmail;
    const comparePwd = await compareHash(password, pwdHash);

    if (!comparePwd) {
        return {
            success: false,
            message: 'Mật khẩu không chính xác',
        };
    }

    const token = jwtSign({
        _id: findUserByEmail._id,
    });

    return {
        success: true,
        message: 'Đăng nhập thành công',
        data: {
            user: {
                email: findUserByEmail.email,
                first_name: findUserByEmail.first_name,
                last_name: findUserByEmail.last_name,
            },
            token: token,
        },
    };
};
