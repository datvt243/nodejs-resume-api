/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { StatusCodes } from 'http-status-codes';
import { formatReturn, _throwError } from '../utils/index.js';

import { createCV } from '../services/createPDF.js';
import { baseFindDocument } from '../services/index.js';

import CandidateModel from '../models/candidate.model.js';
import generalInformationSchema from '../models/generalInformation.model.js';
import EducationModel from '../models/education.model.js';
import ExperienceModel from '../models/experience.model.js';
import ReferenceModel from '../models/reference.modal.js';
import ProjectModel from '../models/project.model.js';
import CertificateModel from '../models/certificate.model.js';
import AwardModel from '../models/award.model.js';

export const fnGetAboutMe = async (req, res) => {
    /**
     *
     */
    const { email = '' } = req.params;
    if (!email) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Không tìm thấy email',
        });
    }

    /**
     * get data
     */
    try {
        const _result = await handlerGetAboutMe(email);
        return formatReturn(res, { ..._result });
    } catch (err) {
        _throwError(res, err);
    }
};

export const handlerGetAboutMe = async (email) => {
    const document = await CandidateModel.findOne({ email }).exec();

    if (!document) {
        return {
            success: false,
            message: 'Email không tồn tại',
            data: null,
        };
    }

    const { _id } = document;

    delete document.password;

    /**
     * lấy thông tin liên quan [học vấn, kinh nghiệm, người liên hệ]
     */
    const getMoreInfo = [
        { collection: 'generalInformation', model: generalInformationSchema },
        { collection: 'experiences', model: ExperienceModel },
        { collection: 'educations', model: EducationModel },
        { collection: 'references', model: ReferenceModel },
        { collection: 'projects', model: ProjectModel },
        { collection: 'certificates', model: CertificateModel },
        { collection: 'awards', model: AwardModel },
    ];

    for (const { collection, model } of getMoreInfo) {
        document[collection] = [];
        const _find = await model.find({ candidateId: _id });
        if (_find) {
            document._doc[collection] = _find;
        }
    }

    const dataResult = JSON.parse(JSON.stringify(document));

    /**
     * remove các property bảo mật và dư thừa
     */
    const keys = ['password', '__v', 'createdAt', 'updatedAt'];
    for (const key of keys) {
        delete dataResult[key];
    }
    for (const { collection } of getMoreInfo) {
        for (const record of dataResult[collection]) {
            for (const key of keys) {
                delete record[key];
            }
        }
    }

    return {
        success: true,
        data: dataResult,
        message: 'Lấy thông tin ứng viên thành công',
    };
};

export const fnExportPDF = async (req, res) => {
    /**
     *
     */

    const { success: _flag, data } = await baseFindDocument({ model: CandidateModel, _id: req.body.candidateId || '' });

    if (!_flag) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Candidate not found' });
        return;
    }

    const { email } = data;
    if (!email) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Email not found' });
        return;
    }

    try {
        const { success, data } = await handlerGetAboutMe(email);
        if (!success) {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Lấy thông tin ứng viên thất bại' });
            return;
        }
        await createCV(data, res);
    } catch (err) {
        _throwError(res, err);
    }
};
