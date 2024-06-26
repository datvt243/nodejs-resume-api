import ExperienceModel from '../models/experience.model.js';

import { schemaExperience } from './experience.validate.js';
import { _consolog, validateSchema } from '../utils/index.js';

import { baseFindDocument, baseDeleteDocument, baseUpdateDocument, baseCreateDocument } from '../services/index.js';

export const handlerExperienceCreate = async (item) => {
    /**
     *
     */
    return await baseCreateDocument({
        document: { ...item },
        schema: schemaExperience,
        model: ExperienceModel,
        name: 'kinh nghiệm làm việc',
        hookAfterSave: async (doc, { data }) => {
            const find = await baseFindDocument({
                model: ExperienceModel,
                fields: { candidateId: doc.candidateId },
                findOne: false,
            });
            data = find;
        },
        hookHasErrors: ({ err }) => {
            _consolog(err);
        },
    });
};

export const handlerExperienceUpdate = async (item) => {
    /**
     * @return {
     *  success: boolean,
     *  message: string,
     *  data: Document,
     *  error: Array
     * }
     */

    return await baseUpdateDocument({
        schema: schemaExperience,
        document: item,
        model: ExperienceModel,
    });
};

export const handlerExperienceDelete = async (id, userID) => {
    return await baseDeleteDocument({
        model: ExperienceModel,
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
        model: ExperienceModel,
        fields: { _id },
    });
    return success;
};
