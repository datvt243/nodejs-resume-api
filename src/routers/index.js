import path, { dirname } from 'path';
import express from 'express';

const router = express.Router();

import { fnGetAboutMe } from '../candidate/candidate.controller.js';
import routerAPI from './api/v1/index.js';

router.use('/api/v1', routerAPI);
router.get('/api/me/:email', fnGetAboutMe);
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
