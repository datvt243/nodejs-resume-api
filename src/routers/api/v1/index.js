import path, { dirname } from 'path';
import express from 'express';
import { verifyToken } from '../../../middlewares/verifyToken.middleware.js';

const router = express.Router();

import routeAuth from './auth.route.js';
import routeCandidate from './candidate.route.js';
import routeEducation from './education.route.js';
import routeExperience from './experience.route.js';
import routeReference from './reference.route.js';

router.use('/auth', routeAuth);
router.use('/candidate', verifyToken, routeCandidate);
router.use('/education', verifyToken, routeEducation);
router.use('/experience', verifyToken, routeExperience);
router.use('/reference', verifyToken, routeReference);

router.get('/*', (req, res) => {
    res.render('404');
});

export default router;
