/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

/* import { validateSchema } from '../utils/index.js'; */
/* import { validateSchema, resFormatResponse, jwtVerify } from '../utils/index.js'; */

const formatReturn = (props) => {
    const { success = false, message = '', errors = null, data = null } = props;
    return {
        success,
        message,
        errors,
        data,
    };
};

export const baseFindDocument = async (props) => {
    /**
     * get data
     */
    const { model: MODEL, fields = { _id: '' }, findOne = true } = props;

    if (!MODEL || !fields || !Object.keys(fields).length) {
        return formatReturn({ success: false, data: null });
    }

    let find;
    if (findOne) {
        find = await MODEL.findOne({ ...fields }).exec();
    } else {
        find = await MODEL.find({ ...fields }).exec();
    }
    return formatReturn({
        success: true,
        data: find,
    });
};

export const baseDeleteDocument = async (props) => {
    const { model: MODEL, _id: __id, name = '', userID } = props;
    const _name = (name + '').toLowerCase();

    /**
     * Check Document có tồn tại không -> findById
     */
    const { isExist, message: _mess, document } = await _baseHelper().baseCheckDocumentById(MODEL, __id);
    if (!isExist) return formatReturn({ success: false, message: _mess });

    const { _id, candidateId = '' } = document;

    /**
     * Kiểm tra doc cần xoá có thuộc người đang xoá hay không
     */
    if (candidateId.toString() !== userID)
        return formatReturn({
            success: false,
            message: `Không thể xoá thông tin ${_name ? _name + ' ' : ''}không phải của bạn`,
        });

    /**
     * tiến hành xoá
     */
    let success = false,
        message = 'Xoá thất bại',
        error = null;
    try {
        const { deletedCount = 0 } = await MODEL.deleteOne({ _id }).exec();
        success = !!deletedCount;
        message = 'Xoá thành công';
    } catch (err) {
        error = err;
    }

    return formatReturn({
        success,
        message,
        errors: error,
    });
};

export const baseUpdateDocument = async (props) => {
    /**
     * get values
     */
    const { document, model: MODEL } = props;

    /**
     * @return
     *  success: boolean,
     *  message: string,
     *  data: Document,
     *  error: Array
     *
     */

    const _valueUpdate = { ...document };
    const { _id } = _valueUpdate;

    /**
     * Check Document có tồn tại không -> findById
     */
    const { isExist, message: _mess } = await _baseHelper().baseCheckDocumentById(MODEL, _id);
    if (!isExist) return formatReturn({ success: false, message: _mess });

    /**
     * validate ở mongoose model
     */
    const modelValid = await _baseHelper().modelValidate(MODEL, { ..._valueUpdate });
    if (!modelValid.success) return formatReturn({ success: false, message: modelValid.message, errors: modelValid.errors });

    /**
     * Save
     */
    let _success = true,
        _message = 'Cập nhật thành công',
        _data = null,
        _errors = {};

    try {
        await MODEL.updateOne({ _id }, _valueUpdate).exec();
        _data = await _baseHelper().getDocumentUpdated(_id, { model: MODEL, select: Object.keys(_valueUpdate) });
    } catch (err) {
        const { message = '', errors = [] } = _baseHelper().handlerCatchError(err);
        _success = false;
        _message = message || `Cập nhật thất bại`;
        _errors = errors;
        props?.hookHasErrors?.({ err });
    } finally {
        /**
         * return
         */
        return formatReturn({
            success: _success,
            message: _message,
            errors: _errors,
            data: _data,
        });
    }
};

export const baseCreateDocument = async (props) => {
    const { document, name = '', model: MODEL } = props;
    const _name = name ? (name + '').toLowerCase() : '';

    /**
     * remove _id nếu có
     */
    delete document._id;

    /**
     * Nếu không có candidateId thì trả về thất bại
     */
    if (!document.candidateId) return formatReturn({ success: false, message: `Thêm mới ${_name ? _name + ' ' : ''} thất bại` });

    /**
     * validate ở mongoose model
     */
    const modelValid = await _baseHelper().modelValidate(MODEL, { ...document });
    if (!modelValid.success) return formatReturn({ success: false, message: modelValid.message, errors: modelValid.errors });

    /**
     * Lưu data
     */
    let _success = true,
        _data = null,
        _message = `Thêm mới ${_name} thành công`,
        _errors = {};

    try {
        _data = await MODEL.create({ _id: null, ...document });
        /**
         * callback thực hiện sau khi thêm mới thành công
         */
        if (props?.hookAfterSave) {
            await props.hookAfterSave?.(document, { success: _success, message: _message, data: _data });
        }
    } catch (err) {
        const { message = '', errors = [] } = _baseHelper().handlerCatchError(err);
        _success = false;
        _message = message || `Thêm mới ${_name} thất bại`;
        _errors = errors;

        /**
         * callback if it's has error
         */
        props?.hookHasErrors?.({ err });
    } finally {
        /**
         * return
         */
        return formatReturn({ success: _success, message: _message, errors: _errors, data: _data });
    }
};

export const basePatchDocument = async (props) => {
    /**
     * get value
     */
    const { schema, document, model: MODEL } = props;

    const { _id } = document;

    /**
     * Check Document có tồn tại không -> findById
     */
    const { isExist, message: _mess } = await _baseHelper().baseCheckDocumentById(MODEL, _id);
    if (!isExist) return formatReturn({ success: false, message: _mess });

    /**
     * validate data before save to database
     */
    /* const { isValidated, message = '', value, errors = [] } = validateSchema({ schema, item: document });
    if (!isValidated) return formatReturn({ success: false, message, errors }); */

    /**
     * validate ở mongoose model
     */
    const modelValid = await _baseHelper().modelValidate(MODEL, { ...document });
    if (!modelValid.success) return formatReturn({ success: false, message: modelValid.message, errors: modelValid.errors });

    try {
        await MODEL.updateOne({ _id }, document).exec();
        /**
         * get information
         */
        const select = Object.keys(document);
        const data = await _baseHelper().getDocumentUpdated(_id, { model: MODEL, select });

        /**
         * return
         */
        return { success: true, message: 'Updated successful', errors: {}, data: data ? data : null };
    } catch (err) {
        /**
         * catch errors
         */
        return { success: false, message: 'Updated fail', error: err, data: null };
    }
};

const _baseHelper = () => {
    return {
        getDocumentUpdated: async (_id, props = {}) => {
            const { model: MODEL, select = '' } = props;
            const find = MODEL.findById(_id);
            if (select) {
                find.select(select);
            }
            return await find.exec();
        },
        modelValidate: async (model, value) => {
            let message = '',
                errors = [],
                success = true;

            try {
                await model.validate(value);
            } catch (err) {
                const { _message, errors: _errors } = err;
                const errs = [];
                for (const [k, v] of Object.entries(_errors)) {
                    errs.push(k);
                }

                success = false;
                message = _message;
                errors = errs;
            }
            return { success, message, errors };
        },
        handlerCatchError: (error) => {
            if (error instanceof ReferenceError) {
                return {
                    message: 'ReferenceError',
                    errors: [error.message],
                };
            }

            return {
                message: 'An unknown error',
                errors: {},
            };
        },
        baseCheckDocumentById: async (MODEL, _id) => {
            let message = `ID không tồn tại`;

            if (!_id) return { isExist: false, message };

            let isExist = true;
            const _find = await MODEL.findById(_id).exec();
            if (!_find) {
                isExist = false;
            } else {
                isExist = true;
                message = '';
            }
            return { isExist, message, document: _find };
        },
    };
};
