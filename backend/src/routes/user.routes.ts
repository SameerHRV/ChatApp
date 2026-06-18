import { Router } from 'express';
import { getProfile } from '../controllers/user.controller';
import protect from '../middleware/auth.middleware';

const router = Router();

router.get('/me', protect, getProfile);

export default router;
