import { Request, Response, NextFunction } from 'express';
import { getAvailableInstance } from '../services/healthChecker';
import axios from 'axios';

export async function deleteController(req: Request, res: Response, next?: NextFunction) {
  const targetUrl = getAvailableInstance('delete'); // Obtém uma instância disponível para "delete"
  if (!targetUrl) {
    return next && next({ status: 503, message: 'Sem instância de delete disponível' });
  }
  const { id } = req.params;
  if (!id) return next && next({ status: 400, message: 'Campos obrigatórios: id' }); // Validação do ID

  try {
    const response = await axios.delete(`${targetUrl}/${id}`); // Encaminha a requisição DELETE
    res.status(response.status).json(response.data);
  } catch (error: any) {
    if (next) return next(error);
    throw error;
  }
}
