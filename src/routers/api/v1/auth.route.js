import express from 'express';
const router = express.Router();

import { authRegister, authLogin } from '../../../auth/auth.controller.js';

router.post('/register', authRegister);
router.get('/login', authLogin);

export default router;
