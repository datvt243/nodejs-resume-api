import path, { dirname } from 'path';
import express from 'express';

const router = express.Router();

import routerAPI from './api/v1/index.js';

router.use('/api/v1', routerAPI);
router.get('/*', (req, res) => {
    res.send(`<div style="text-align: center; padding: 50px">Hello World!</div>`);
});

export default router;
