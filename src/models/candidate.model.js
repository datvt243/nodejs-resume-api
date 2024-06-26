import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const shema = new Schema(
    {
        email: { type: String, default: '', required: [false, 'Vui lòng nhập email'] },
        password: { type: String, default: '', required: [false, 'Vui lòng nhập email'] },

        /* họ và tên */
        first_name: { type: String, default: '', required: [false, 'Vui lòng nhập họ'] },
        last_name: { type: String, default: '', required: [false, 'Vui lòng nhập tên'] },

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
    },
    { timestamps: true },
);

const Candidate = mongoose.model('candidate', shema);

export default Candidate;
