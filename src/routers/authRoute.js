import express from 'express';
const router = express.Router();

import { authGetPageRegister, authGetPageLogin, authRegister } from '../controllers/authController.js';

/* const { authGetPageRegister, authGetPageLogin, authRegister } = require('../controllers/auth.controller'); */

router.get('/register', authGetPageRegister);
router.get('/login', authGetPageLogin);

router.post('/register', authRegister);

export default router;
