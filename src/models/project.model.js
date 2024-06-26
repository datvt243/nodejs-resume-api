import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const shema = new Schema(
    {
        //
    },
    { timestamps: true },
);

const Project = mongoose.model('project', shema);

export default Project;
