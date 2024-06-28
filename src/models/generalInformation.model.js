/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

import { foreignLanguageSchema, professionalSkillsSchema } from './part/index.js';

const shema = new Schema(
    {
        candidateId: { type: ObjectId, required: [true, 'Vui lòng nhập ID ứng viên'], ref: 'candidate' },
        /* vị trí mong muốn */
        positionDesired: { type: String, default: '', required: [false, 'Vui lòng nhập vị trí mong muốn'] },
        career: { type: String, default: '', required: [false, 'Vui lòng nhập nghề nghiệp'] },
        levelCurrent: { type: String, default: '', required: [false, 'Vui lòng nhập cấp bậc hiện tại'] },
        levelDesired: { type: String, default: '', required: [false, 'Vui lòng nhập cấp bậc mong muốn'] },
        salaryDesired: { type: Number, default: '', required: [false, 'Vui lòng nhập mức lương mong muốn'] },
        education: { type: String, default: '', required: [false, 'Vui lòng học vấn'] },
        yearsOfExperience: { type: Number, default: 0, required: [false, 'Vui lòng nhập số năm kinh nghiệm'] },
        workLocation: { type: String, default: '', required: [false, 'Vui lòng nhập địa điểm làm việc'] },
        workForm: { type: String, default: '', required: [false, 'Vui lòng nhập hình thưc làm việc'] },
        careerGoal: { type: String, default: '', required: [false, 'Vui lòng nhập hình thưc làm việc'] },
        personalSkills: { type: [String], default: [] },
        professionalSkills: { type: [professionalSkillsSchema], default: [] },
        foreignLanguage: {
            type: [foreignLanguageSchema],
            default: [],
            required: [false, 'Vui lòng nhập ngoại ngữ'],
        },
    },
    { timestamps: true },
);

const generalInformation = mongoose.model('general-information', shema);

export default generalInformation;
