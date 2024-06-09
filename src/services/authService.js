import { schemaAuthLoginAndRegister } from '../validations/authValidate.js';
import { informationRegister } from '../controllers/informationController.js';
import Candidate from '../models/informationModel.js';

import { handlerBcrypt } from '../utils/bcrypt.js';

export const isEmailAlreadyExists = async (email) => {
    const find = await Candidate.findOne({ email });
    return find ? true : false;
};

export const registerNewAccount = async (item) => {
    const { email, password, repassword } = item;

    /**
     * validate data trước khi lưu vào database
     */
    const { error, value } = schemaAuthLoginAndRegister.validate({
        email,
        password,
        repassword,
    });

    if (error) {
        return {
            error: true,
            document: null,
        };
    }

    const bcryptPwd = handlerBcrypt(value.password);
    const document = await Candidate.create({
        email: value.email,
        password: bcryptPwd,
    });
    return { error: false, document };
};
