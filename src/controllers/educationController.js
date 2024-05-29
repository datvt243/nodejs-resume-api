import Education from '../models/educationModel.js';
import { GENDER } from '../constant/constant.js';
import { _throwError } from '../utils/helper.js';

export const educationGetPageIndex = (req, res, next) => {
    res.render('education/index', {
        data: {
            _id: '_education_',
        },
    });
};
