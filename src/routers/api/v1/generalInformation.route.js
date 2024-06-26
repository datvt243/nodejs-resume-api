/* const path = require('path'); */
import express from 'express';
import { fnCreate, fnUpdate, fnDelete, fnUpdateFields } from '../../../general_information/generalInformation.controller.js';

const router = express.Router();

router.post('/create', fnCreate);
router.put('/update', fnUpdate);
router.patch('/update', fnUpdateFields);
router.delete('/delete/:id', fnDelete);

export default router;
