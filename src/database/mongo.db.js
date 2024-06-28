/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import mongoose from 'mongoose';

import { MONGOBD_USER, MONGOBD_PASSWORD } from '../config/process.config.js';
import { _consolog } from '../utils/index.js';

const connectMongo = function (callback = () => {}) {
    mongoose
        .connect(
            `mongodb+srv://${MONGOBD_USER}:${MONGOBD_PASSWORD}@davidapi.jhhu4ml.mongodb.net/resume-api?retryWrites=true&w=majority&appName=davidAPI`,
        )
        .then(() => {
            _consolog(`--------------------`);
            _consolog('MongooDB Connected!');
            callback?.();
        })
        .catch((err) => {
            _consolog({ text: `Connect failed !!! ${err}`, type: 'error' });
        });
};

export default connectMongo;
