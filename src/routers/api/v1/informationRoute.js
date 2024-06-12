/* const path = require('path'); */
import express from 'express';
const router = express.Router();

import { getInformationByEmail, informationUpdateDocument } from '../../../controllers/informationController.js';

router.get('/:email', getInformationByEmail);

router.patch('/update', informationUpdateDocument);

export default router;
