import { StatusCodes } from 'http-status-codes';
import { formatReturn, validateSchema, _throwError } from '../utils/index.js';
import { schemaCandidate, schemaCandidatePatch } from './candidate.validate.js';
import { handlerUpdate, handlerGetInformationByEmail, handlerGetInformationById } from './candidate.service.js';

export const fnGetInformationById = async (req, res) => {
    const { id = '', email = '' } = req.params;
    const doc = await handlerGetInformationById(id);

    const _flag = !!doc;
    return formatReturn(res, { success: _flag, message: _flag ? '' : 'Không tìm thấy người dùng', data: doc });
};

export const fnGetInformationByEmail = async (req, res) => {
    const { email = '' } = req.params;
    const doc = await handlerGetInformationByEmail(email);
    const _flag = !!doc;
    return formatReturn(res, { success: _flag, message: _flag ? '' : 'Không tìm thấy người dùng', data: doc });
};

export const fnUpdate = async (req, res) => {
    /**
     * validate data come from req.body
     */
    const { isValidated, value, errors } = validateSchema({ schema: schemaCandidate, item: { ...req.body } });
    if (!isValidated)
        return formatReturn(res, { statusCode: StatusCodes.UNAUTHORIZED, success: false, message: 'Xảy ra lỗi', errors });

    /**
     * update data
     */
    try {
        const _result = await handlerUpdate(value);
        return formatReturn(res, { ..._result });
    } catch (err) {
        _throwError(res, err);
    }
};

export const fnUpdateFields = async (req, res) => {
    /**
     * validate data gửi lên
     */
    const { isValidated, value, errors } = validateSchema({
        schema: schemaCandidatePatch,
        item: { ...req.body },
    });
    if (!isValidated)
        return formatReturn(res, { statusCode: StatusCodes.UNAUTHORIZED, success: false, message: 'Xảy ra lỗi', errors });

    /**
     * update data
     */
    try {
        const _result = await handlerUpdate(value);
        return formatReturn(res, { ..._result });
    } catch (err) {
        _throwError(res, err);
    }
};
