/* const path = require('path'); */
import express from 'express';
import { educationGetPageIndex } from '../../../controllers/educationController.js';

const router = express.Router();

router.get('/', educationGetPageIndex);

export default router;
