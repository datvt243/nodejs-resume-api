import express from 'express';
const router = express.Router();

import { authRegister, authLogin } from '../../../controllers/authController.js';
router.post('/register', authRegister);
router.get('/login', authLogin);

export default router;
