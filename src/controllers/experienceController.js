import Experience from '../models/experienceModel.js';
import { GENDER } from '../constant/constant.js';
import { _throwError } from '../utils/helper.js';

export const experienceGetPageIndex = (req, res, next) => {
    res.render('experience/index', {
        data: {
            _id: '_experience_',
        },
    });
};
