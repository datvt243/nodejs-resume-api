/* const path = require('path'); */
import express from 'express';

import { experienceGetPageIndex } from '../../../controllers/experienceController.js';

const router = express.Router();

router.get('/', experienceGetPageIndex);

export default router;
