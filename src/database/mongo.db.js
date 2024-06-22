import mongoose from 'mongoose';

import { MONGOBD_USER, MONGOBD_PASSWORD } from '../config/process.config.js';

const connectMongo = function (callback = () => {}) {
    mongoose
        .connect(
            `mongodb+srv://${MONGOBD_USER}:${MONGOBD_PASSWORD}@davidapi.jhhu4ml.mongodb.net/resume-api?retryWrites=true&w=majority&appName=davidAPI`,
        )
        .then(() => {
            console.log(`--------------------`);
            console.log('MongooDB Connected!');
            callback?.();
        })
        .catch((err) => {
            console.error('Connect failed !!!', err);
        });
};

export default connectMongo;
