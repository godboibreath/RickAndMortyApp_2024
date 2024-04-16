import { Router } from 'express';

import characterRoute from './character';

const router = Router();

router.use('/character', characterRoute);

export default router;
