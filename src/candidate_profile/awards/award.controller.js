/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { StatusCodes } from 'http-status-codes';
import { schemaAward } from './award.validate.js';
import { handlerCreate, handlerUpdate, handlerDelete } from './award.service.js';
import { validateSchema, formatReturn, _throwError } from '../../utils/index.js';

const SHCEMA = schemaAward;
export const fnCreate = async (req, res) => {
    /**
     * validate data gửi lên
     */
    const { isValidated, value = {}, errors, message } = validateSchema({ schema: SHCEMA, item: { ...req.body } });
    if (!isValidated) return formatReturn(res, { success: false, message, errors });

    /**
     * save mới document
     */
    try {
        !value.isNoExpiration && (value.isNoExpiration = false);
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
    const {
        isValidated,
        value = {},
        errors,
        message,
    } = validateSchema({
        schema: SHCEMA,
        item: { ...req.body },
    });
    if (!isValidated) return formatReturn(res, { success: false, message, errors });

    /**
     * update document
     */
    try {
        !value.isNoExpiration && (value.isNoExpiration = false);
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
