import EducationModel from '../models/education.model.js';

import { schemaEducation } from './education.validate.js';
import { _consolog, validateSchema } from '../utils/index.js';

import { baseFindDocument, baseDeleteDocument, baseUpdateDocument, baseCreateDocument } from '../services/index.js';

export const handlerEducationCreate = async (item) => {
    /**
     *
     */
    return await baseCreateDocument({
        document: { ...item },
        schema: schemaEducation,
        model: EducationModel,
        name: 'Học vấn',
        hookAfterSave: async (doc, { data }) => {
            const find = await baseFindDocument({
                model: EducationModel,
                fields: { candidateId: doc.candidateId },
                findOne: false, // Tìm tất cả
            });
            data = find;
        },
        hookHasErrors: ({ err }) => {
            _consolog(err);
        },
    });
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

    return await baseUpdateDocument({
        schema: schemaEducation,
        document: item,
        model: EducationModel,
    });
};

export const handlerEducationDelete = async (id, userID) => {
    return await baseDeleteDocument({
        model: EducationModel,
        _id: id,
        userID,
        name: 'học vấn',
    });
};

export const handlerCheckEducationId = async (_id) => {
    /**
     *
     */
    const { success } = await baseFindDocument({
        model: EducationModel,
        fields: { _id },
    });
    return success;
};

export const handlerGetEducationById = async (_id) => {
    /**
     *
     */
    const { success, data } = await baseFindDocument({
        model: EducationModel,
        fields: { _id },
    });
    return success ? find : {};
};
