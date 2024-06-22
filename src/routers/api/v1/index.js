import path, { dirname } from 'path';
import express from 'express';

const router = express.Router();

import routeAuth from './auth.route.js';
import routeCandidate from './candidate.route.js';

/* import routeExperience from './experience.route.js';
import routeEducation from './education.route.js'; */

router.use('/auth', routeAuth);
router.use('/candidate', routeCandidate);

/* router.use('/experience', routeExperience);
router.use('/education', routeEducation); */
router.get('/*', (req, res) => {
    res.render('404');
});

export default router;
