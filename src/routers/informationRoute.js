/* const path = require('path'); */
import express from 'express';
const router = express.Router();

import { REQUEST_STATUS } from '../constant/constant.js';
import { informationGetPageIndex, informationUpdateDocument } from '../controllers/informationController.js';

router.get('/', informationGetPageIndex);

router.post('/', informationUpdateDocument);

export default router;
