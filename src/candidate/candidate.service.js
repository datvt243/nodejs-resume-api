import CandidateModel from '../models/candidate.model.js';
import EducationModel from '../models/education.model.js';
import ExperienceModel from '../models/experience.model.js';
import ReferenceModel from '../models/reference.modal.js';

import { schemaCandidate } from './candidate.validate.js';

export const handlerGetInformationById = async (id, props = {}) => {
    const { select = '' } = props;
    const find = CandidateModel.findById(id);
    if (select) {
        find.select(select);
    }

    return await find.exec();
};

export const handlerGetInformationByEmail = async (email) => {
    const find = await CandidateModel.findOne({ email }).exec();
    return find;
};

export const handlerUpdate = async (item) => {
    /**
     * @return {
     *  success: boolean,
     *  message: string,
     *  data: Document,
     *  errors: Array
     * }
     */

    if (!(await CandidateModel.findById(item._id))) {
        return { success: false, message: 'ID không tồn tại' };
    }

    const value = { ...item };

    /**
     * validate data trước khi lưu vào database
     */
    try {
        await CandidateModel.validate(value);
    } catch (err) {
        const { _message, errors: _errors } = err;
        const errs = [];
        for (const [k, v] of Object.entries(_errors)) {
            errs.push(k);
        }
        return { success: false, message: _message, errors: errs, data: null };
    }

    /**
     * update
     */
    const res = await CandidateModel.updateOne({ _id: value._id || '' }, value).exec();

    /**
     * lấy thông tin vừa update
     */
    const _select = getSelectFields(value);
    const _find = await handlerGetInformationById(value._id, { select: _select });
    /**
     * return
     */
    return { success: true, message: 'Cập nhật thành công', errors: [], data: _find ? _find : {} };
};

export const handlerGetAboutMe = async (email) => {
    const document = await CandidateModel.findOne({ email }).exec();

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

    return {
        success: true,
        data: document,
    };
};

const getSelectFields = (val) => {
    let f = [];
    for (const v of Object.keys(val)) {
        f.push(v);
    }
    return f.join(' ');
};
