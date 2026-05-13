import { Router } from 'express';

import vmRoutes from './vm-routes';
import authRoutes from './auth-routes';

const router = Router();

router.use('/vms', vmRoutes);
router.use('/auth', authRoutes);

export default router;
