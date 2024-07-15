/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import ReferenceModel from '../../models/reference.modal.js';
import { baseFindDocument, baseDeleteDocument, baseUpdateDocument, baseCreateDocument } from '../../services/index.js';

const MODEL = ReferenceModel;

export const handlerGet = async (candidateId) => {
    return await baseFindDocument({ fields: { candidateId: candidateId }, model: MODEL, findOne: false });
};

export const handlerCreate = async (item) => {
    /**
     *
     */
    const result = await baseCreateDocument({
        document: { ...item },
        model: MODEL,
        name: 'Thông tin người tham khảo',
        hookAfterSave: async (doc, { data }) => {
            const { success, data: find } = await baseFindDocument({
                model: MODEL,
                fields: { candidateId: doc.candidateId },
                findOne: false,
            });
            success && (data = find);
        },
        hookHasErrors: ({ err }) => {
            //
        },
    });

    return result;
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
        name: 'Thông tin người tham khảo',
    });
};
