/* const path = require('path'); */
import express from 'express';
import { REQUEST_STATUS } from '../constant/constant.js';
import { educationGetPageIndex } from '../controllers/educationController.js';

const router = express.Router();

router.get('/', educationGetPageIndex);

export default router;
