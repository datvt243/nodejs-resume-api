import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const foreignLanguageSchema = new Schema(
    {
        foreignLanguage: { type: String, required: true },
        level: { type: String, required: true },
    },
    { _id: false },
);

const professionalSkillsSchema = new Schema(
    {
        name: { type: String, required: true },
        exp: { type: Number, required: true },
    },
    { _id: false },
);

const candidateShema = new Schema(
    {
        email: { type: String, default: '', required: [false, 'Vui lòng nhập email'] },
        password: { type: String, default: '', required: [false, 'Vui lòng nhập email'] },

        /* họ và tên */
        first_name: { type: String, default: '', required: [false, 'Vui lòng nhập họ'] },
        last_name: { type: String, default: '', required: [false, 'Vui lòng nhập tên'] },
        /* vị trí */
        position: { type: String, default: '', required: [false, 'Vui lòng nhập vị trí công việc'] },
        /* học vấn */
        education: { type: String, default: '', required: [false, 'Vui lòng nhập học vấn'] },

        gender: { type: Boolean, default: 0, required: [false, 'Vui lòng nhập giới tính'] },
        marital: { type: Boolean, default: 0, required: [false, 'Vui lòng nhập tình trạng hôn nhân'] },
        birthday: { type: Number, default: 0, min: 0, required: [false, 'Vui lòng nhập ngày sinh'] },
        address: { type: String, default: '' },

        phone: { type: String, default: '', required: [false, 'Vui lòng nhập số điện thoại'] },
        introduction: { type: String, default: '', required: [false, 'Vui lòng nhập giới thiệu bản thân'] },

        socialMedia: {
            type: Map,
            of: String,
        },
        yearsOfExperience: { type: Number, default: 0, required: [false, 'Vui lòng nhập số năm kinh nghiệm'] },
        foreignLanguage: {
            type: [foreignLanguageSchema],
            default: [],
            required: [false, 'Vui lòng nhập ngoại ngữ'],
        },

        personalSkills: { type: [String], default: [] },
        professionalSkills: { type: [professionalSkillsSchema], default: [] },
        /* educationId: { type: ObjectId, default: null, required: [false] },
        experienceId: { type: ObjectId, default: null, required: [false] }, */
    },
    { timestamps: true },
);

const Candidate = mongoose.model('candidate', candidateShema);

export default Candidate;
