/* const path = require('path'); */
import express from 'express';
import { experienceCreate, experienceUpdate, experienceDelete } from '../../../experience/experience.controller.js';

const router = express.Router();

router.post('/create', experienceCreate);
router.put('/update', experienceUpdate);
router.delete('/delete/:id', experienceDelete);

export default router;
