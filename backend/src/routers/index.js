import express from 'express';
import routerAuth from "./auth.js"
import routerJobs from './jobs.js';
import routerPositions from './posiitions.js';

const router = express.Router()

router.use('/auth', routerAuth)
router.use('/jobs', routerJobs)
router.use('/positions', routerPositions )


export default router