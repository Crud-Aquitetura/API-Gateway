import { Request, Response, NextFunction } from 'express';
import logger from '../services/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  // Log do erro (usando o logger configurado)
  logger.error(`[${req.method}] ${req.originalUrl} - ${status} - ${message}`);

  // Resposta padronizada para o cliente
  res.status(status).json({
    error: true,
    message,
    details: err.details || undefined // Inclui detalhes adicionais se existirem
  });
}
