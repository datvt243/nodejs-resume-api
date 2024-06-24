import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;
const experienceShema = new Schema(
    {
        company: { type: String, default: '', required: [false, 'Vui lòng nhập Tên công ty'] },
        position: { type: String, default: '', required: [false, 'Vui lòng nhập vị trí công việc'] },
        startDate: { type: Number, default: '', required: [false, 'Vui lòng nhập ngày bắt đầu'] },
        endDate: { type: Number, default: '', required: [false, 'Vui lòng nhập ngày kết thúc'] },
        description: { type: String, default: '', required: [false, 'Vui lòng nhập mô tả'] },
        isCurrent: { type: Boolean, default: false },
        candidateId: { type: ObjectId, default: [true, 'Vui lòng nhập ID ứng viên'], ref: 'candidate' },
    },
    { timestamps: true },
);

const Experience = mongoose.model('experience', experienceShema);

export default Experience;
