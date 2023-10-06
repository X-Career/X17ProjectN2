import express from 'express';
import routerAuth from "./auth.js"
import routerJobs from './jobs.js';
import routerTests from './test.js';
import routerCandidates from './candidate.js';
import routerMail from './mail.js';
import routerRecruitmgr from './recruitmgr.js';

const router = express.Router()

router.use('/auth', routerAuth)
router.use('/jobs', routerJobs)
router.use('/tests', routerTests)
router.use('/candidates', routerCandidates)
router.use('/mails', routerMail)
router.use('/recruitmgrs', routerRecruitmgr)



export default router