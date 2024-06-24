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
        find = await MODEL.findOne({ ...fields });
    } else {
        find = await MODEL.find({ ...fields });
    }

    return formatReturn({
        success: true,
        data: find,
    });
};

export const baseDeleteDocument = async (props) => {
    const { model: MODEL, _id, name = '', userID } = props;
    const _name = (name + '').toLowerCase();

    /**
     * lấy doc cần delete
     */
    const _find = await MODEL.findById(_id);
    if (!_find)
        return formatReturn({
            success: false,
            message: `Thông tin ${_name ? _name + ' ' : ''}không tồn tại`,
        });

    /**
     * Kiểm tra doc cần xoá có thuộc người đang xoá hay không
     */
    if (_find?.candidateId.toString() !== userID)
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
        const { deletedCount = 0 } = await MODEL.deleteOne({ _id: _find._id });
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

    /**
     * validate data trước khi lưu vào database
     */
    const { isValidated, message = '', value, error = [] } = validateSchema({ schema, item: document });
    if (!isValidated) return formatReturn({ success: false, message, error });

    /**
     * update data
     */
    const { _id } = document;
    const res = await MODEL.updateOne({ _id }, value);

    /**
     * lấy thông tin vừa update
     */
    const _find = await MODEL.findOne({ _id });

    /**
     * return
     */
    return formatReturn({ success: true, message: 'Cập nhật thành công', data: _find ? _find : null });
};

export const baseCreateDocument = async (props) => {
    const { document, schema, name = '', model: MODEL } = props;
    const _name = name ? (name + '').toLowerCase() : '';

    /**
     * Nếu không có candidateId thì trả về thất bại
     */
    if (!document.candidateId)
        return formatReturn({ success: false, message: `Thêm mới ${_name ? _name + ' ' : ''} thất bại 1` });

    /**
     * validate data trước khi lưu vào database
     * Make sure data đúng trước khi đc lưu vào db
     */
    const { isValidated, value = {} } = validateSchema({ schema, item: { ...document } });
    if (!isValidated) return formatReturn({ success: false, message: `Lỗi validate` });

    /**
     * Lưu data
     */
    let _success = true,
        _data = null,
        _message = '';

    try {
        value._id = null;
        await MODEL.create(value);

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
