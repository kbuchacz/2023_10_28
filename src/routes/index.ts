import express, { Router } from 'express';
import queueRouter from './queue.routes'

const apiPath = '/api';
const router: Router = express.Router();

router.use(apiPath, queueRouter);

export const applicationRouter: Router = router;