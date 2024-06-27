import EducationModel from '../models/education.model.js';
import { baseFindDocument, baseDeleteDocument, baseUpdateDocument, baseCreateDocument } from '../services/index.js';

const MODEL = EducationModel;
const NAME = 'Học vấn';

export const handlerCreate = async (item) => {
    /**
     *
     */
    return await baseCreateDocument({
        document: { ...item },
        model: MODEL,
        name: NAME,
        hookAfterSave: async (doc, { data }) => {
            const find = await baseFindDocument({
                model: MODEL,
                fields: { candidateId: doc.candidateId },
                findOne: false, // Tìm tất cả
            });
            data = find;
        },
        hookHasErrors: ({ err }) => {
            // do something
        },
    });
};

export const handlerUpdate = async (item) => {
    /**
     * @return {
     *  success: boolean,
     *  message: string,
     *  data: Document,
     *  error: Array
     * }
     */

    return await baseUpdateDocument({
        document: item,
        model: MODEL,
    });
};

export const handlerDelete = async (id, userID) => {
    return await baseDeleteDocument({
        model: MODEL,
        _id: id,
        userID,
        name: NAME,
    });
};

export const handlerCheckEducationId = async (_id) => {
    /**
     *
     */
    const { success } = await baseFindDocument({
        model: MODEL,
        fields: { _id },
    });
    return success;
};

export const handlerGetEducationById = async (_id) => {
    /**
     *
     */
    const { success, data } = await baseFindDocument({
        model: MODEL,
        fields: { _id },
    });
    return success ? find : {};
};
