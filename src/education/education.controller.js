import { StatusCodes } from 'http-status-codes';
import { schemaEducation } from './education.validate.js';
import { _consolog, formatReturn, validateSchema, resFormatResponse, jwtVerify } from '../utils/index.js';

import {
    handlerEducationCreate,
    handlerEducationUpdate,
    handlerEducationDelete,
    handlerCheckEducationId,
} from './education.service.js';

export const educationCreate = async (req, res) => {
    /**
     * validate data gửi lên
     */
    const { isValidated, value = {}, error: errors } = validateSchema({ schema: schemaEducation, item: { ...req.body } });
    if (!isValidated) return formatReturn(res, { success: false, message: 'Lỗi validate', errors });

    /**
     * save mới document
     */
    !value.isCurrent && (value.isCurrent = false);
    const _result = await handlerEducationCreate(value);
    return formatReturn(res, { ..._result });
};

export const educationUpdate = async (req, res) => {
    const _helper = educationHelperFn();

    /**
     * Kiểm tra có _id hay không, và _id có tồn tại trong db hay không
     */
    const _message = _helper.checkId(req.body._id);
    if (_message) return formatReturn(res, { success: false, message: _message });

    /**
     * validate data gửi lên
     */
    const { isValidated, value = {}, error: errors } = validateSchema({ schema: schemaEducation, item: { ...req.body } });
    if (!isValidated) return formatReturn(res, { success: false, message: 'Lỗi validate', errors });

    /**
     * update document
     */
    !value.isCurrent && (value.isCurrent = false);
    const _result = await handlerEducationUpdate(value);
    return formatReturn(res, { ..._result });
};

export const educationDelete = async (req, res) => {
    const { id = '' } = req.params;
    if (!id) return formatReturn(res, { success: false, message: 'ID không được trống' });

    /**
     * delete
     */
    const _result = await handlerEducationDelete(id, req.body.candidateId);
    return formatReturn(res, { ..._result });
};

const educationHelperFn = () => {
    const checkId = (id) => {
        if (!id) return 'Field _id không được trống';
        if (!handlerCheckEducationId(id)) return 'Thông tin học vấn không tồn tại';
        return '';
    };

    return {
        checkId,
    };
};
