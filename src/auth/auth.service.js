/* import CandidateModel from '../candidate/candidate.model.js'; */
import CandidateModel from '../models/candidate.modal.js';
import { schemaAuthLogin } from './auth.validate.js';
import { GenerateSalt, compareHash, jwtSign } from '../utils/index.js';

export const isEmailAlreadyExists = async (email) => {
    const find = await CandidateModel.findOne({ email });
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
    const document = await CandidateModel.create({
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

    const findUserByEmail = await CandidateModel.findOne({ email });

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
