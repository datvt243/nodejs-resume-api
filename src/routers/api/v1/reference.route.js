/* const path = require('path'); */
import express from 'express';
import { fnCreate, fnUpdate, fnDelete } from '../../../reference_information/reference.controller.js';

const router = express.Router();

router.post('/create', fnCreate);
router.put('/update', fnUpdate);
router.delete('/delete/:id', fnDelete);

export default router;
