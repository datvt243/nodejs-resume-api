import { validateSchema } from '../utils/index.js';
/* import { validateSchema, resFormatResponse, jwtVerify } from '../utils/index.js'; */

const formatReturn = (props) => {
    const { success = false, message = '', error = null, data = null } = props;
    return {
        success,
        message,
        error,
        data,
    };
};

const baseCheckDocumentById = async (_id) => {
    const message = `ID không tồn tại`;

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
};

export const baseFindDocument = async (props) => {
    /**
     * Need: params { model, fields = {} }
     */
    const data = null;

    const { model: MODEL, fields = { _id: '' }, findOne = true } = props;
    if (!MODEL || !fields || !Object.keys(fields).length) {
        success = false;
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
    const { isExist, message: _mess, document } = await baseCheckDocumentById(__id);
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
        error,
    });
};

export const baseUpdateDocument = async (props) => {
    const { schema, document, model: MODEL } = props;

    /**
     * @return {
     *  success: boolean,
     *  message: string,
     *  data: Document,
     *  error: Array
     * }
     */

    const { _id } = document;

    /**
     * Check Document có tồn tại không -> findById
     */
    const { isExist, message: _mess } = await baseCheckDocumentById(_id);
    if (!isExist) return formatReturn({ success: false, message: _mess });

    /**
     * validate data trước khi lưu vào database
     */
    const { isValidated, message = '', value, error = [] } = validateSchema({ schema, item: document });
    if (!isValidated) return formatReturn({ success: false, message, error });

    /**
     * update data
     */
    const res = await MODEL.updateOne({ _id }, value).exec();

    /**
     * lấy thông tin vừa update
     */
    const _find = await MODEL.findOne({ _id }).exec();

    /**
     * return
     */
    return formatReturn({
        success: !!_find,
        message: !!_find ? 'Cập nhật thành công' : 'Cập nhật thất bại',
        data: _find ? _find : null,
    });
};

export const baseCreateDocument = async (props) => {
    const { document, schema, name = '', model: MODEL } = props;
    const _name = name ? (name + '').toLowerCase() : '';

    /**
     * Nếu không có candidateId thì trả về thất bại
     */
    if (!document.candidateId) return formatReturn({ success: false, message: `Thêm mới ${_name ? _name + ' ' : ''} thất bại` });

    /**
     * validate data trước khi lưu vào database
     * Make sure data đúng trước khi đc lưu vào db
     */
    const { isValidated, value = {}, error, message } = validateSchema({ schema, item: { ...document } });
    if (!isValidated) return formatReturn({ success: false, message, error });

    /**
     * Lưu data
     */
    let _success = true,
        _data = null,
        _message = '';

    try {
        value._id = null;
        await MODEL.create(value).exec();

        _success = true;
        _message = `Thêm mới ${_name} thành công`;

        /**
         * callback thực hiện sau khi thêm mới thành công
         */
        if (props?.hookAfterSave) {
            await props.hookAfterSave?.(document, { success: _success, message: _message, data: _data });
        }
    } catch (err) {
        _success = false;
        _message = `Thêm mới ${_name} thất bại`;

        /**
         * callback thực hiện nếu xảy ra lỗi
         */
        props?.hookHasErrors?.({ err });
    }

    return formatReturn({ success: _success, message: _message, data: _data });
};
