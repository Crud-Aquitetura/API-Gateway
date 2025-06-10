import { Router, Request, Response, NextFunction } from 'express';
import { selectController } from '../controllers/selectController';
import { insertController } from '../controllers/insertController';
import { updateController } from '../controllers/updateController';
import { deleteController } from '../controllers/deleteController';
import { loggerMiddleware } from '../middlewares/logger';
import { insertLocalController, selectLocaisController } from '../controllers/locaisController';

const router = Router();

router.get('/', loggerMiddleware, selectController); // Rota para listar eventos
router.post('/', loggerMiddleware, insertController); // Rota para inserir eventos
router.put('/:id', loggerMiddleware, updateController); // Rota para atualizar eventos por ID
router.delete('/:id', loggerMiddleware, deleteController); // Rota para deletar eventos por ID
router.post('/locais', loggerMiddleware, insertLocalController); // Endpoint para cadastrar local
router.get('/locais', loggerMiddleware, selectLocaisController); // Endpoint para listar locais

export default router;
