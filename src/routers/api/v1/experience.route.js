/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

/* const path = require('path'); */
import express from 'express';
import { fnGet, fnCreate, fnUpdate, fnDelete } from '../../../candidate_profile/experience/experience.controller.js';

const router = express.Router();

router.get('/', fnGet);
router.post('/create', fnCreate);
router.put('/update', fnUpdate);
router.delete('/delete/:id', fnDelete);

export default router;
