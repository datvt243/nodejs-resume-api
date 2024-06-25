/* const path = require('path'); */
import express from 'express';
import { referenceCreate, referenceUpdate, referenceDelete } from '../../../reference_information/reference.controller.js';

const router = express.Router();

router.post('/create', referenceCreate);
router.put('/update', referenceUpdate);
router.delete('/delete/:id', referenceDelete);

export default router;
