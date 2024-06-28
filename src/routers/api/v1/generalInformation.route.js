/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

/* const path = require('path'); */
import express from 'express';
import {
    fnCreate,
    fnUpdate,
    fnDelete,
    fnUpdateFields,
} from '../../../candidate_profile/general_information/generalInformation.controller.js';

const router = express.Router();

router.post('/create', fnCreate);
router.put('/update', fnUpdate);
router.patch('/update', fnUpdateFields);
router.delete('/delete/:id', fnDelete);

export default router;
