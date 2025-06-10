import { Request, Response, NextFunction } from 'express';
import logger from '../services/logger';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now(); // Marca o início da requisição

  res.on('finish', () => { // Evento 'finish' é disparado quando a resposta é enviada
    const duration = Date.now() - start; // Calcula a duração da requisição
    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

    // Loga mensagens em diferentes níveis baseados no status da resposta
    if (res.statusCode >= 500) {
      logger.error(logMessage); // Erros de servidor
    } else if (res.statusCode >= 400) {
      logger.warn(logMessage); // Erros de cliente
    } else {
      logger.info(logMessage); // Requisições bem-sucedidas
    }
  });

  next(); // Passa para o próximo middleware ou rota
}