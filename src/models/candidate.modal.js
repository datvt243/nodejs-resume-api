import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objectId = Schema.objectId;
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
        birthday: { type: Number, default: 0, min: 0, required: [false, 'Vui lòng nhập ngày sinh'] },
        address: { type: String, default: '' },

        phone: { type: String, default: '', required: [false, 'Vui lòng nhập số điện thoại'] },
        introduction: { type: String, default: '', required: [false, 'Vui lòng nhập giới thiệu bản thân'] },
        linkLinkedin: { type: String, default: '' },
        linkGithub: { type: String, default: '' },
        linkWebsite: { type: String, default: '' },

        /* education_id: { type: objectId, default: null, required: [false] }, */
    },
    { timestamps: true },
);

const Candidate = mongoose.model('candidate', candidateShema);

export default Candidate;
