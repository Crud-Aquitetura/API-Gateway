import { Router, Request, Response, NextFunction } from 'express';
import { selectController } from '../controllers/selectController';
import { insertController } from '../controllers/insertController';
import { updateController } from '../controllers/updateController';
import { deleteController } from '../controllers/deleteController';
import { loggerMiddleware } from '../middlewares/logger';

const router = Router();

router.get('/', loggerMiddleware, selectController); // Rota para listar eventos
router.post('/', loggerMiddleware, insertController); // Rota para inserir eventos
router.put('/:id', loggerMiddleware, updateController); // Rota para atualizar eventos por ID
router.delete('/:id', loggerMiddleware, deleteController); // Rota para deletar eventos por ID

export default router;
