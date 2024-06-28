import path, { dirname } from 'path';
import express from 'express';

const router = express.Router();

import { fnGetAboutMe } from '../candidate_me/index.js';
import routerAPI from './api/v1/index.js';

/**
 * API V1
 */
router.use('/api/v1', routerAPI);

/**
 * get ME
 */
router.get('/api/me/:email', fnGetAboutMe);

/**
 * get page home
 */
router.get('/*', (req, res) => {
    res.send(
        `<div style="text-align: center; padding: 50px">
            <h1 style="font-size: 8vw; text-transform: uppercase; letter-spacing: .1em;">Hello World!</h1> 
            <br/>
            <p>Go to <a href="https://datvt243.github.io/vue-resume-web/">Resume Web Page</a></p>
        </div>`,
    );
});

export default router;
