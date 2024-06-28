/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import generalInformationShema from '../../models/generalInformation.model.js';
import { baseFindDocument, baseDeleteDocument, baseUpdateDocument, baseCreateDocument } from '../../services/index.js';

const MODEL = generalInformationShema;
export const handlerCreate = async (document) => {
    /**
     * @return {
     *  success: boolean,
     *  message: string,
     *  data: Document,
     *  error: Array | null
     * }
     */

    /**
     * check candidate đã có doc nào chưa,
     *  - đã có: không lưu
     */
    const { success, data } = await baseFindDocument({
        model: MODEL,
        fields: { candidateId: document?.candidateId },
    });
    if (success) {
        return {
            success: false,
            message: 'Ứng viên đã có thông tin, không thể lưu',
        };
    }

    /**
     * save
     */
    return await baseCreateDocument({
        document: { ...document },
        model: MODEL,
        name: 'Thông tin chung',
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

export const handlerUpdate = async (document) => {
    /**
     * @return {
     *  success: boolean,
     *  message: string,
     *  data: Document,
     *  error: Array | null
     * }
     */

    return await baseUpdateDocument({
        document: { ...document },
        model: MODEL,
    });
};

export const handlerDelete = async (id, userID) => {
    return await baseDeleteDocument({
        model: MODEL,
        _id: id,
        userID,
        name: 'Thông tin chung',
    });
};

export const handerUpdateFields = async (req, res) => {
    /**
     * @return {
     *  success: boolean,
     *  message: string,
     *  data: Document,
     *  error: Array | null
     * }
     */

    return await basePatchDocument({
        document: { ...document },
        model: MODEL,
    });
};
