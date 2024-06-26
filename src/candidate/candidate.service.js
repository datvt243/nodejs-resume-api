import CandidateModel from '../models/candidate.modal.js';
import EducationModel from '../models/education.model.js';
import ExperienceModel from '../models/experience.model.js';
import ReferenceModel from '../models/reference.modal.js';

import { schemaCandidate, schemaCandidateProfessionalSkills } from './candidate.validate.js';
import { validateSchema } from '../utils/index.js';

export const handlerCandidateGetInformationById = async (id) => {
    const find = await CandidateModel.findById(id);
    return find;
};
export const handlerCandidateGetInformationByEmail = async (email) => {
    const find = await CandidateModel.findOne({ email });
    return find;
};

export const handlerCandidateUpdate = async (item) => {
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
    const { isValidated, message = '', value, error = [] } = validateSchema({ schema: schemaCandidate, item });
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
    const res = await CandidateModel.updateOne({ _id: value._id || '' }, value);

    /**
     * lấy thông tin vừa update
     */
    const _find = await handlerCandidateGetInformationById(value._id);

    /**
     * return
     */
    return { success: true, message: 'Cập nhật thành công', error: [], data: _find ? _find : null };
};

export const handlerGetAboutMe = async (email) => {
    const document = await CandidateModel.findOne({ email });

    /* const document = { ...find }; */
    if (!document) {
        return {
            success: false,
            message: 'Email không tồn tại',
            data: null,
        };
    }

    const { _id } = document;

    /**
     * lấy thông tin liên quan [học vấn, kinh nghiệm, người liên hệ]
     */
    const getMoreInfo = [
        { collection: 'experiences', model: ExperienceModel },
        { collection: 'educations', model: EducationModel },
        { collection: 'references', model: ReferenceModel },
    ];

    for (const { collection, model } of getMoreInfo) {
        document[collection] = [];
        const _datas = await model.find({ candidateId: _id });
        if (_datas) {
            document._doc[collection] = _datas;
        }
    }

    /* document.experiences = [];
    document.educations = [];

    
    const experiences = await ExperienceModel.find({ candidateId: _id });
    if (experiences) {
        document._doc.experiences = experiences;
    }

    
    const educations = await EducationModel.find({ candidateId: _id });
    if (educations) {
        document._doc.educations = educations;
    }

    
    const references = await ReferenceModel.find({ candidateId: _id });
    if (references) {
        document._doc.references = references;
    } */

    return {
        success: true,
        data: document,
    };
};

export const handlerCandidateUpdatePatch = async (item) => {
    /**
     * validate data trước khi lưu vào database
     */
    const { isValidated, message = '', value, error = [] } = validateSchema({ schema: schemaCandidateProfessionalSkills, item });
    if (!isValidated) {
        return {
            success: false,
            message,
            error,
            data: null,
        };
    }

    const { _id } = value;

    /**
     * convert data
     */
    const res = await CandidateModel.updateOne({ _id: _id || '' }, value);

    /**
     * lấy thông tin vừa update
     */
    const _find = await handlerCandidateGetInformationById(_id);

    /**
     * return
     */
    return { success: true, message: 'Cập nhật thành công', error: [], data: _find ? _find : null };
};
