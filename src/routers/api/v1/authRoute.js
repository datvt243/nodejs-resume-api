import express from 'express';
const router = express.Router();

import { authGetPageRegister, authGetPageLogin, authRegister } from '../../../controllers/authController.js';

router.get('/register', authGetPageRegister);
router.get('/login', authGetPageLogin);

router.post('/register', authRegister);

export default router;
