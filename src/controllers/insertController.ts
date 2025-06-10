import { Request, Response, NextFunction } from 'express';
import { getAvailableInstance } from '../services/healthChecker';
import axios from 'axios';
import { EventModel } from '../models/Event';

export async function insertController(req: Request, res: Response, next?: NextFunction) {
  const { nome, descricao, data_inicio, data_fim, local_id, status, preco_entrada, imagem_url } =
    req.body as Partial<EventModel>;

  // Validação dos campos obrigatórios
  if (!nome) return next && next({ status: 400, message: 'Campos obrigatórios: nome' });
  if (!data_inicio) return next && next({ status: 400, message: 'Campos obrigatórios: data_inicio' });
  if (!data_fim) return next && next({ status: 400, message: 'Campos obrigatórios: data_fim' });
  if (!local_id) return next && next({ status: 400, message: 'Campos obrigatórios: local_id' });
  if (!status) return next && next({ status: 400, message: 'Campos obrigatórios: status' });
  if (!preco_entrada) return next && next({ status: 400, message: 'Campos obrigatórios: preco_entrada' });
  if (!imagem_url) return next && next({ status: 400, message: 'Campos obrigatórios: imagem_url' });

  const targetUrl = getAvailableInstance('insert'); // Obtém uma instância disponível para "insert"
  if (!targetUrl) {
    return next && next({ status: 503, message: 'Sem instância de insert disponível' });
  }

  try {
    const response = await axios.post(targetUrl, req.body); // Encaminha a requisição POST com o corpo
    res.status(response.status).json(response.data);
  } catch (error: any) {
    if (next) return next(error);
    throw error;
  }
}