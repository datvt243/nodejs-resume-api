/* import CandidateModel from '../candidate/candidate.model.js'; */
import CandidateModel from '../models/candidate.model.js';
import { generateSalt, compareHash, jwtSign } from '../utils/index.js';
import { TOKEN_SECRET, TOKEN_REFRESH } from '../config/process.config.js';

export const isEmailAlreadyExists = async (email) => {
    const find = await CandidateModel.findOne({ email });
    return find ? true : false;
};

export const handlerRegister = async (item) => {
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
     * check Email đã tồn tại chưa
     */
    const emailHasExits = await isEmailAlreadyExists(email);
    if (emailHasExits) return { success: false, message: 'Email đã tồn tại' };

    /**
     * TODO: validate data với mogo model.valid
     */

    const bcryptPwd = generateSalt(password);
    const document = await CandidateModel.create({
        email: email,
        password: bcryptPwd,
    });
    return { success: true, message: 'Đăng ký thành công' };
};

export const handlerLogin = async (data = {}) => {
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
    if (!findUserByEmail) return { success: false, message: 'Email không tồn tại' };

    const { password: pwdHash } = findUserByEmail;
    const comparePwd = await compareHash(password, pwdHash);
    if (!comparePwd) return { success: false, message: 'Mật khẩu không chính xác' };

    const token = jwtSign(
        {
            _id: findUserByEmail._id,
        },
        TOKEN_SECRET,
    );

    const tokenRefresh = jwtSign(
        {
            _id: findUserByEmail._id,
        },
        TOKEN_REFRESH,
    );

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
            tokenRefresh: tokenRefresh,
        },
    };
};
