/* const path = require('path'); */
import express from 'express';
const router = express.Router();

import {
    candidateGetInformationByEmail,
    candidateUpdate,
    candidateUpdateFields,
} from '../../../candidate/candidate.controller.js';

router.get('/:email', candidateGetInformationByEmail);

router.put('/update', candidateUpdate);
router.patch('/update-fields', candidateUpdateFields);
/* router.patch('/update', candidateUpdate); */

export default router;
