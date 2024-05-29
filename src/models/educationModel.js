import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objectId = Schema.objectId;
const educationShema = new Schema(
    {
        shool: { type: String, default: '', required: [false, 'Vui lòng nhập Tên trường'] },
        major: { type: String, default: '', required: [false, 'Vui lòng nhập ngành học'] },
        startDate: { type: Number, default: '', required: [false, 'Vui lòng nhập ngày bắt đầu'] },
        endDate: { type: Number, default: '', required: [false, 'Vui lòng nhập ngày kết thúc'] },
        description: { type: String, default: '', required: [false, 'Vui lòng nhập mô tả'] },
        isCurrent: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const Education = mongoose.model('education', educationShema);

export default Education;
