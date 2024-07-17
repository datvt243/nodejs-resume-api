/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { StatusCodes } from 'http-status-codes';
import { schemaReference } from './reference.validate.js';
import { handlerGet, handlerCreate, handlerUpdate, handlerDelete } from './reference.service.js';
import { formatReturn, validateSchema, _throwError } from '../../utils/index.js';

const SCHEMA = schemaReference;

export const fnGet = async (req, res) => {
    const candidateId = req.body.candidateId || '';
    if (!candidateId) return formatReturn(res, { statusCode: StatusCodes.NOT_FOUND, data: null, message: 'Không tìm thấy data' });
    try {
        const _result = await handlerGet(candidateId);
        return formatReturn(res, { ..._result });
    } catch (err) {
        _throwError(res, err);
    }
};

export const fnCreate = async (req, res) => {
    /**
     * validate data gửi lên
     */
    const { isValidated, value = {}, errors } = validateSchema({ schema: SCHEMA, item: { ...req.body } });
    if (!isValidated) return formatReturn(res, { success: false, message: 'Lỗi validate _', errors });

    /**
     * save mới document
     */
    try {
        const _result = await handlerCreate(value);
        return formatReturn(res, { statusCode: StatusCodes.CREATED, ..._result });
    } catch (err) {
        _throwError(res, err);
    }
};

export const fnUpdate = async (req, res) => {
    /**
     * validate data gửi lên
     */
    const { isValidated, value = {}, errors } = validateSchema({ schema: SCHEMA, item: { ...req.body } });
    if (!isValidated) return formatReturn(res, { success: false, message: 'Lỗi validate', errors });

    /**
     * update document
     */
    try {
        const _result = await handlerUpdate(value);
        return formatReturn(res, { ..._result });
    } catch (err) {
        _throwError(res, err);
    }
};

export const fnDelete = async (req, res) => {
    const { id = '' } = req.params;
    if (!id) return formatReturn(res, { success: false, message: 'ID không được trống' });

    try {
        const _result = await handlerDelete(id, req.body.candidateId);
        return formatReturn(res, { ..._result });
    } catch (err) {
        _throwError(res, err);
    }
};
