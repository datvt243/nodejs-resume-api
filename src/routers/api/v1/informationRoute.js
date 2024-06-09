/* const path = require('path'); */
import express from 'express';
const router = express.Router();

import { informationGetPageIndex, informationUpdateDocument } from '../../../controllers/informationController.js';

router.get('/', informationGetPageIndex);

router.post('/', informationUpdateDocument);

export default router;
