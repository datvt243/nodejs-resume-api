/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

/* const path = require('path'); */
import express from 'express';
const router = express.Router();

import { fnGetInformationByEmail, fnUpdate, fnUpdateFields } from '../../../candidate/candidate.controller.js';

router.get('/:email', fnGetInformationByEmail);
router.put('/update', fnUpdate);
router.patch('/update', fnUpdateFields);

export default router;
