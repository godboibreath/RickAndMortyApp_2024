import characterController from '../controllers/character';
import { Router } from 'express';

const router = Router();

router.get('/', characterController.get);

export default router;
