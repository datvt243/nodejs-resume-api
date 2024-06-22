import CandidateModel from '../models/candidate.modal.js';

import { schemaInformation } from './candidate.validate.js';
import { validateSchema } from '../utils/index.js';

export const getDocumentById = async (id) => {
    const find = await CandidateModel.findById(id);
    return find;
};
export const getDocumentByEmail = async (email) => {
    const find = await CandidateModel.findOne({ email });
    return find;
};

export const update = async (item) => {
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
    const { isValidated, message = '', value, error = [] } = validateSchema({ schema: schemaInformation, item });
    if (!isValidated) {
        return {
            success: false,
            message,
            error,
            data: null,
        };
    }

    /**
     * convert data
     */
    const res = await CandidateModel.updateOne({ _id: value._id || '' }, value);

    /**
     * lấy thông tin vừa update
     */
    const _find = await getDocumentById(value._id);

    /**
     * return
     */
    return { success: true, message: 'Cập nhật thành công', error: [], data: _find ? _find : null };
};
