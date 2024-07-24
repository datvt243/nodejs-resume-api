/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import CandidateModel from '../models/candidate.model.js';

const MODEL = CandidateModel;
export const handlerGetInformationById = async (id, props = {}) => {
    const { select = '' } = props;
    const find = MODEL.findById(id);
    if (select) {
        find.select(select);
    }

    return await find.exec();
};

export const handlerGetInformationByEmail = async (email) => {
    const find = await MODEL.findOne({ email }).exec();
    return find;
};

export const handlerUpdate = async (item) => {
    /**
     * @return
     *  success: boolean,
     *  message: string,
     *  data: Document,
     *  errors: Array
     *
     */

    if (!(await MODEL.findById(item._id))) {
        return { success: false, message: 'ID không tồn tại' };
    }

    const value = { ...item };

    /**
     * validate data trước khi lưu vào database
     */
    try {
        await MODEL.validate(value);
    } catch (err) {
        const { _message, errors: _errors } = err;
        const errs = [];
        for (const [k, v] of Object.entries(_errors)) {
            errs.push(k);
        }
        return { success: false, message: _message, errors: errs, data: null };
    }

    /**
     * update
     */
    const res = await MODEL.updateOne({ _id: value._id || '' }, value).exec();

    /**
     * lấy thông tin vừa update
     */
    const _select = getSelectFields(value);
    const _find = await handlerGetInformationById(value._id, { select: _select });
    /**
     * return
     */
    return { success: true, message: 'Cập nhật thành công', errors: {}, data: _find ? _find : {} };
};

const getSelectFields = (val) => {
    let f = [];
    for (const v of Object.keys(val)) {
        f.push(v);
    }
    return f.join(' ');
};
