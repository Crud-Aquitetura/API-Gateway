import { Request, Response, NextFunction } from 'express';
import { getAvailableInstance } from '../services/healthChecker';
import axios from 'axios';

export async function selectController(req: Request, res: Response, next?: NextFunction) {
  const targetUrl = getAvailableInstance('select'); // Obtém uma instância disponível para "select"
  if (!targetUrl) {
    return next && next({ status: 503, message: 'Sem instância de select disponível' }); // Erro 503 se não houver instância
  }

  try {
    const response = await axios.get(targetUrl); // Encaminha a requisição GET
    res.status(response.status).json(response.data); // Retorna a resposta do backend
  } catch (error: any) {
    if (next) return next(error); // Repassa o erro para o errorHandler
    throw error;
  }
}