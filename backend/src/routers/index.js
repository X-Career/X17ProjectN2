import express from 'express';
import routerAuth from "./auth.js"
import routerJobs from './jobs.js';
import routerTests from './test.js';
import routerCandidates from './candidate.js';

const router = express.Router()

router.use('/auth', routerAuth)
router.use('/jobs', routerJobs)
router.use('/tests', routerTests)
router.use('/candidates', routerCandidates)

export default router