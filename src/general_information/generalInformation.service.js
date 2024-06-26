import generalInformationShema from '../models/generalInformation.model.js';
import { baseFindDocument, baseDeleteDocument, baseUpdateDocument, baseCreateDocument } from '../services/index.js';
import { schemaGeneralInformation, schemaGeneralInformationPatch } from './generalInformation.validate.js';
import { _consolog, validateSchema } from '../utils/index.js';

const VALIDATE_SCHEMA = schemaGeneralInformation;
const VALIDATE_SCHEMA_PATCH = schemaGeneralInformationPatch;
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

    return await baseCreateDocument({
        document: { ...document },
        model: MODEL,
        name: 'Thông tin chung',
        hookAfterSave: async (doc, { data }) => {
            const find = await baseFindDocument({
                model: MODEL,
                fields: { candidateId: doc.candidateId },
                findOne: false,
            });
            data = find;
        },
        hookHasErrors: ({ err }) => {
            /* console.log({ errops: err });
            _consolog(err); */
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
        schema: VALIDATE_SCHEMA,
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
        schema: VALIDATE_SCHEMA,
        model: MODEL,
    });
};
