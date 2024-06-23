import EducationModel from '../models/education.model.js';

import { schemaEducation } from './education.validate.js';
import { validateSchema } from '../utils/index.js';

export const handlerEducationCreate = async (item) => {
    /**
     * Nếu không có candidateId thì trả về thất bại
     */
    if (!item.candidateId) {
        return { success: false, message: 'Thêm mới học vấn thất bại' };
    }
    /**
     * validate data trước khi lưu vào database
     * Make sure data đúng trước khi đc lưu vào db
     */
    const { isValidated, value = {} } = validateSchema({ schema: schemaEducation, item: { ...item } });
    if (!isValidated) return { success: false, message: 'Lỗi validate' };

    const document = await EducationModel.create(value);
    return { success: true, message: 'Thêm mới học vấn thành công', data: document };
};

export const handlerEducationUpdate = async (item) => {
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
    const { isValidated, message = '', value, error = [] } = validateSchema({ schema: schemaEducation, item });
    if (!isValidated) {
        return {
            success: false,
            message,
            error,
        };
    }

    /**
     * update data
     */
    const res = await EducationModel.updateOne({ _id: value._id || '' }, value);

    /**
     * lấy thông tin vừa update
     */
    const _find = await EducationModel.findOne({ _id: value._id });

    /**
     * return
     */
    return { success: true, message: 'Cập nhật thành công', error: [], data: _find ? _find : null };
};

export const handlerEducationDelete = async (id, userID) => {
    const _find = await EducationModel.findById(id);

    if (!_find) return { success: false, message: 'Thông tin học vấn không tồn tại', error: null, data: null };

    const { candidateId = '' } = _find;

    if (candidateId.toString() !== userID) {
        return { success: false, message: 'Không thể xoá thông tin học vấn không phải của bạn', error: null, data: null };
    }

    let isDeleted = false;
    try {
        const deletedCount = EducationModel.deleteOne({ _id: _find._id });
        isDeleted = !!deletedCount;
        console.log({ deletedCount, isDeleted });
    } catch (err) {
        console.log(err);
    }

    /**
     * return
     */

    return {
        success: isDeleted ? true : false,
        message: isDeleted ? 'Xoá thành công' : 'Xoá thất bại',
        error: [],
        data: _find ? _find : null,
    };
};

export const handlerCheckEducationId = async (_id) => {
    /**
     *
     */
    const find = await EducationModel.findOne({ _id });
    return find ? true : false;
};

export const handlerGetEducationById = async (_id) => {
    /**
     *
     */
    const find = await EducationModel.findOne({ _id });
    return find;
};
