/* const path = require('path'); */
import express from 'express';
import { REQUEST_STATUS } from '../constant/constant.js';
import { experienceGetPageIndex } from '../controllers/experienceController.js';
/* const { experienceGetPageIndex } = require('../controllers/experience.controller'); */

const router = express.Router();

router.get('/', experienceGetPageIndex);

export default router;
