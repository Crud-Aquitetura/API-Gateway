// API_Gateway-main/src/routes/index.ts

import { Router } from 'express';
import { selectController } from '../controllers/selectController';
import { insertController } from '../controllers/insertController';
import { updateController } from '../controllers/updateController';
import { deleteController } from '../controllers/deleteController';
import { loggerMiddleware } from '../middlewares/logger';

const router = Router();

// --- Rotas para Eventos ---
router.get('/eventos', loggerMiddleware, selectController);
router.post('/', loggerMiddleware, insertController);
router.put('/:id', loggerMiddleware, updateController);
router.delete('/:id', loggerMiddleware, deleteController);

export default router;
