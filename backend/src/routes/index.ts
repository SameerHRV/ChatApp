import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is healthy and online.',
    timestamp: new Date(),
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
