/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import path, { dirname } from 'path';
import express from 'express';
import { verifyToken } from '../../../middlewares/verifyToken.middleware.js';

const router = express.Router();

import routeAuth from './auth.route.js';
import routeCandidate from './candidate.route.js';
import routeEducation from './education.route.js';
import routeExperience from './experience.route.js';
import routeReference from './reference.route.js';
import routeGeneralInformation from './generalInformation.route.js';
import routeProject from './project.route.js';
import routeCertificate from './certificate.route.js';
import routeAward from './award.route.js';

router.use('/auth', routeAuth);
router.use('/award', verifyToken, routeAward);
router.use('/candidate', verifyToken, routeCandidate);
router.use('/education', verifyToken, routeEducation);
router.use('/experience', verifyToken, routeExperience);
router.use('/reference', verifyToken, routeReference);
router.use('/general-information', verifyToken, routeGeneralInformation);
router.use('/project', verifyToken, routeProject);
router.use('/certificate', verifyToken, routeCertificate);

router.get('/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Page not found',
        errors: null,
        dataa: null,
    });
});

export default router;
