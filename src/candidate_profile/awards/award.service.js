/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import AwardModel from '../../models/award.model.js';
import { baseFindDocument, baseDeleteDocument, baseUpdateDocument, baseCreateDocument } from '../../services/index.js';

const MODEL = AwardModel;
const NAME = 'giải thưởng';
export const handlerCreate = async (item) => {
    /**
     *
     */
    return await baseCreateDocument({
        document: { ...item },
        model: MODEL,
        name: NAME,
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
