/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { StatusCodes } from 'http-status-codes';
import { handlerCreate, handlerUpdate, handlerDelete } from './generalInformation.service.js';
import { schemaGeneralInformation, schemaGeneralInformationPatch } from './generalInformation.validate.js';
import { formatReturn, _throwError, validateSchema } from '../../utils/index.js';

const VALIDATE_SCHEMA = schemaGeneralInformation;
const VALIDATE_SCHEMA_PATCH = schemaGeneralInformationPatch;

export const fnCreate = async (req, res) => {
    /**
     * validate data gửi lên
     */
    const { isValidated, value = {}, errors } = validateSchema({ schema: VALIDATE_SCHEMA, item: { ...req.body } });
    if (!isValidated) return formatReturn(res, { success: false, message: 'Lỗi validate', errors });

    /**
     * save mới document
     */
    try {
        const _result = await handlerCreate(value);
        return formatReturn(res, { ..._result });
    } catch (err) {
        _throwError(res, err);
    }
};

export const fnUpdate = async (req, res) => {
    /**
     * validate data gửi lên
     */
    const { isValidated, value, errors } = validateSchema({
        schema: req.method === 'PUT' ? VALIDATE_SCHEMA : VALIDATE_SCHEMA_PATCH,
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

export const fnUpdateFields = async (req, res) => {
    /**
     * validate data gửi lên
     */
    const { isValidated, value, errors } = validateSchema({
        schema: VALIDATE_SCHEMA_PATCH,
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

export const fnDelete = async (req, res) => {
    const { id = '' } = req.params;
    if (!id) return formatReturn(res, { success: false, message: 'ID không được trống' });

    /**
     * delete
     */
    try {
        const _result = await handlerDelete?.(id, req.body.candidateId);
        return formatReturn(res, { ..._result });
    } catch (err) {
        _throwError(res, err);
    }
};
