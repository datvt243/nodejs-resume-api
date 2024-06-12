import Candidate from '../models/informationModel.js';
import { schemaInformation } from '../validations/informationValidate.js';
import { validateSchema } from '../utils/helper.js';

export const getDocumentById = async (id) => {
    const find = await Candidate.findById(id);
    return find;
};
export const getDocumentByEmail = async (email) => {
    const find = await Candidate.findOne({ email });
    return find;
};

/* export const finDocumentByIdOrEmail = async (props) => {
    const email
    const find = await Candidate.findOne({});
}; */

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
    const { gender } = value;

    const { _id } = value;
    const res = await Candidate.updateOne({ _id }, value);

    const _find = await getDocumentById(_id);

    return { success: true, message: 'Cập nhật thành công', error: [], data: { _find } };
};
