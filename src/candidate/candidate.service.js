import CandidateModel from '../models/candidate.modal.js';

import { schemaCandidate } from './candidate.validate.js';
import { validateSchema } from '../utils/index.js';

export const handlerCandidateGetInformationById = async (id) => {
    const find = await CandidateModel.findById(id);
    return find;
};
export const handlerCandidateGetInformationByEmail = async (email) => {
    const find = await CandidateModel.findOne({ email });
    return find;
};

export const handlerCandidateUpdate = async (item) => {
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
    const { isValidated, message = '', value, error = [] } = validateSchema({ schema: schemaCandidate, item });
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
    const _find = await handlerCandidateGetInformationById(value._id);

    /**
     * return
     */
    return { success: true, message: 'Cập nhật thành công', error: [], data: _find ? _find : null };
};
