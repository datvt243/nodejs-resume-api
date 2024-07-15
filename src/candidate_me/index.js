/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { StatusCodes } from 'http-status-codes';
import { formatReturn, validateSchema, _throwError } from '../utils/index.js';

import CandidateModel from '../models/candidate.model.js';
import generalInformationShema from '../models/generalInformation.model.js';
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

const handlerGetAboutMe = async (email) => {
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

    /* const document = ((val) => {
        const _result = {};
        for (const key of Object.keys(val)) {
            console.log({ key });
            if (!['_id', 'password', '__v'].includes(key)) {
                _result[key] = val[key];
            }
        }
        return _result;
    })(__doc?._doc || __doc); */

    delete document.password;

    /**
     * lấy thông tin liên quan [học vấn, kinh nghiệm, người liên hệ]
     */
    const getMoreInfo = [
        { collection: 'generalInformation', model: generalInformationShema },
        { collection: 'experiences', model: ExperienceModel },
        { collection: 'educations', model: EducationModel },
        { collection: 'references', model: ReferenceModel },
        { collection: 'projects', model: ProjectModel },
        { collection: 'certificates', model: CertificateModel },
        { collection: 'awards', model: AwardModel },
    ];

    for (const { collection, model } of getMoreInfo) {
        document[collection] = [];
        const _datas = await model.find({ candidateId: _id });
        if (_datas) {
            document._doc[collection] = _datas;
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
