import ExperienceModel from '../models/experience.model.js';
import { baseFindDocument, baseDeleteDocument, baseUpdateDocument, baseCreateDocument } from '../services/index.js';

const MODEL = ExperienceModel;
export const handlerCreate = async (item) => {
    /**
     *
     */
    return await baseCreateDocument({
        document: { ...item },
        model: MODEL,
        name: 'kinh nghiệm làm việc',
        hookAfterSave: async (doc, { data }) => {
            const find = await baseFindDocument({
                model: MODEL,
                fields: { candidateId: doc.candidateId },
                findOne: false,
            });
            data = find;
        },
        hookHasErrors: ({ err }) => {
            //
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
        name: 'kinh nghiệm làm việc',
    });
};
