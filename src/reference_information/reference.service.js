import ReferenceModel from '../models/reference.modal.js';

import { schemaReference } from './reference.validate.js';
import { validateSchema } from '../utils/index.js';

import { baseFindDocument, baseDeleteDocument, baseUpdateDocument, baseCreateDocument } from '../services/index.js';

export const handlerReferenceCreate = async (item) => {
    /**
     *
     */
    const result = await baseCreateDocument({
        document: { ...item },
        schema: schemaReference,
        model: ReferenceModel,
        name: 'kinh nghiệm làm việc',
        hookAfterSave: async (doc, { data }) => {
            const find = await baseFindDocument({
                model: ReferenceModel,
                fields: { candidateId: doc.candidateId },
                findOne: false,
            });
            data = find;
        },
        hookHasErrors: ({ err }) => {
            console.log(err);
        },
    });

    return result;
};

export const handlerReferenceUpdate = async (item) => {
    /**
     * @return {
     *  success: boolean,
     *  message: string,
     *  data: Document,
     *  error: Array
     * }
     */

    return await baseUpdateDocument({
        schema: schemaReference,
        document: item,
        model: ReferenceModel,
    });
};

export const handlerReferenceDelete = async (id, userID) => {
    return await baseDeleteDocument({
        model: ReferenceModel,
        _id: id,
        userID,
        name: 'kinh nghiệm làm việc',
    });
};

export const handlerCheckExperienceId = async (_id) => {
    /**
     *
     */
    const { success } = await baseFindDocument({
        model: ReferenceModel,
        fields: { _id },
    });
    return success;
};
