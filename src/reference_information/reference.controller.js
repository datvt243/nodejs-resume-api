import { StatusCodes } from 'http-status-codes';
import { schemaReference } from './reference.validate.js';
import { formatReturn, validateSchema, resFormatResponse } from '../utils/index.js';

import {
    handlerReferenceCreate,
    handlerReferenceUpdate,
    handlerReferenceDelete,
    handlerCheckExperienceId,
} from './reference.service.js';

export const referenceCreate = async (req, res) => {
    /**
     * validate data gửi lên
     */
    const { isValidated, value = {}, error: errors } = validateSchema({ schema: schemaReference, item: { ...req.body } });
    if (!isValidated) return formatReturn(res, { success: false, message: 'Lỗi validate _', errors });

    /**
     * save mới document
     */
    const _result = await handlerReferenceCreate(value);
    return formatReturn(res, { ..._result });
};

export const referenceUpdate = async (req, res) => {
    const _helper = _helperFn();

    /**
     * Kiểm tra có _id hay không, và _id có tồn tại trong db hay không
     */
    const _message = _helper.checkId(req.body._id);
    if (_message) return formatReturn(res, { success: false, message: _message });

    /**
     * validate data gửi lên
     */
    const { isValidated, value = {}, error: errors } = validateSchema({ schema: schemaReference, item: { ...req.body } });
    if (!isValidated) return formatReturn(res, { success: false, message: 'Lỗi validate', errors });

    /**
     * update document
     */
    const _result = await handlerReferenceUpdate(value);
    return formatReturn(res, { ..._result });
};

export const referenceDelete = async (req, res) => {
    const { id = '' } = req.params;
    if (!id) {
        return resFormatResponse(res, StatusCodes.BAD_REQUEST, { success: false, message: 'ID không được trống' });
    }

    const _result = await handlerReferenceDelete(id, req.body.candidateId);
    return formatReturn(res, { ..._result });
};

const _helperFn = () => {
    return {
        checkId: (id) => {
            if (!id) return 'Field _id không được trống';
            if (!handlerCheckExperienceId(id)) return 'Thông tin Kinh nghiệm làm việc không tồn tại';
            return '';
        },
    };
};
