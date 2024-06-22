/* const path = require('path'); */
import express from 'express';
const router = express.Router();

/* import { getInformationByEmail, informationUpdateDocument } from '../../../controllers/informationController.js'; */
import { getInformationByEmail, informationUpdateDocument } from '../../../candidate/candidate.controller.js';

router.get('/:email', getInformationByEmail);

router.patch('/update', informationUpdateDocument);

export default router;
