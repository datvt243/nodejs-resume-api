import { StatusCodes } from 'http-status-codes';
import { resBadRequest, resFormatResponse } from '../utils/helper.js';

import Information from '../models/informationModel.js';
import { schemaInformation } from '../validations/informationValidate.js';

import { GENDER } from '../constant/constant.js';
import { _throwError, validateSchema } from '../utils/helper.js';

import { update, getDocumentByEmail } from '../services/informationService.js';

export const getInformationById = async (req, res, next) => {
    const { id = '', email = '' } = req.params;
    const doc = await getDocumentById(id);
    resFormatResponse(res, StatusCodes.OK, {
        success: !!doc,
        message: doc ? '' : 'Không tìm thấy người dùng',
        errors: [],
        data: doc,
    });
};

export const getInformationByEmail = async (req, res, next) => {
    const { email = '' } = req.params;
    const doc = await getDocumentByEmail(email);
    resFormatResponse(res, StatusCodes.OK, {
        success: !!doc,
        message: doc ? '' : 'Không tìm thấy người dùng',
        errors: [],
        data: doc,
    });
};

export const informationUpdateDocument = async (req, res, next) => {
    console.log(1);
    /**
     * validate data come from req.body
     */
    const { isValidated, value, error: _error } = validateSchema({ schema: schemaInformation, item: { ...req.body } });
    if (!isValidated) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, { success: false, message: 'Xảy ra lỗi', errors: _error });
        return;
    }

    /**
     * update data
     */
    const { success, message, data = null, error = [] } = await update(value);

    if (!success) {
        resFormatResponse(res, StatusCodes.UNAUTHORIZED, { success: false, message: message, errors: error });
        return;
    }

    resFormatResponse(res, StatusCodes.OK, {
        success: true,
        message,
        errors: error,
        data,
    });
};
