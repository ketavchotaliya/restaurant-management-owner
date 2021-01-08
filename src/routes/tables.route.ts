import { Router } from 'express';

import TablesRoutes from '../components/tables';
const router = Router();
/**
 * Init All routes here
 */

// Private Routes
router.use('/api/v1/tables', TablesRoutes);

export default router;
