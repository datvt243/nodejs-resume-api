import path, { dirname } from 'path';
import express from 'express';

const router = express.Router();

import routeExperience from './experienceRoute.js';
import routeEducation from './educationRoute.js';
import routeInformation from './informationRoute.js';
import routeAuth from './authRoute.js';

/* router.use('/information', require(path.join(__dirname, './information.route')));
router.use('/experience', require(path.join(__dirname, './experience.route')));
router.use('/', require(path.join(__dirname, './auth.route'))); */

router.use('/information', routeInformation);
router.use('/experience', routeExperience);
router.use('/education', routeEducation);
router.use('/', routeAuth);
router.get('/', (req, res) => {
    /* throw new Error('error.message'); */
    res.render('home/index', {
        data: {
            _id: null,
        },
    });
});
router.get('/*', (req, res) => {
    res.render('404');
});

export default router;
