/* const path = require('path'); */
import express from 'express';
import { educationCreate, educationUpdate, educationDelete } from '../../../candidate_profile/education/education.controller.js';

const router = express.Router();

/* router.get('/', educationGetPageIndex); */
router.post('/create', educationCreate);
router.put('/update', educationUpdate);
router.delete('/delete/:id', educationDelete);

export default router;
