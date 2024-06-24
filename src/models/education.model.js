import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;
const educationShema = new Schema(
    {
        _id: { type: ObjectId, required: [false, 'Vui lòng nhập ID'] },
        shool: { type: String, default: '', required: [false, 'Vui lòng nhập Tên trường'] },
        major: { type: String, default: '', required: [false, 'Vui lòng nhập ngành học'] },
        startDate: { type: Number, default: '', required: [false, 'Vui lòng nhập ngày bắt đầu'] },
        endDate: { type: Number, default: '', required: [false, 'Vui lòng nhập ngày kết thúc'] },
        description: { type: String, default: '', required: [false, 'Vui lòng nhập mô tả'] },
        isCurrent: { type: Boolean, default: false },
        candidateId: { type: ObjectId, default: [true, 'Vui lòng nhập ID ứng viên'], ref: 'candidate' },
    },
    { timestamps: true },
);

const Education = mongoose.model('education', educationShema);

export default Education;
