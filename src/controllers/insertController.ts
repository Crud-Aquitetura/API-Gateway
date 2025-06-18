// API_Gateway-main/src/controllers/insertController.ts

import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { EventModel } from '../models/Event';

export async function insertController(req: Request, res: Response, next?: NextFunction) {
  // ... (Validação dos campos obrigatórios permanece a mesma)
  const { nome, descricao, data_inicio, data_fim, local_id, status, preco_entrada, imagem_url } =
    req.body as Partial<EventModel>;

  if (!nome) return next && next({ status: 400, message: 'Campos obrigatórios: nome' });
  if (!data_inicio) return next && next({ status: 400, message: 'Campos obrigatórios: data_inicio' });
  if (!data_fim) return next && next({ status: 400, message: 'Campos obrigatórios: data_fim' });
  if (!local_id) return next && next({ status: 400, message: 'Campos obrigatórios: local_id' });
  if (!status) return next && next({ status: 400, message: 'Campos obrigatórios: status' });
  if (!preco_entrada) return next && next({ status: 400, message: 'Campos obrigatórios: preco_entrada' });
  if (!imagem_url) return next && next({ status: 400, message: 'Campos obrigatórios: imagem_url' });

  const backendBaseUrl = getAvailableInstance('backend'); // Pega a URL base do backend
  if (!backendBaseUrl) {
    return next && next({ status: 503, message: 'Sem instância de backend disponível' });
  }

  try {
    // CONSTRÓI A URL COMPLETA para o endpoint de INSERT de eventos
    const response = await axios.post(`${backendBaseUrl}/api/events`, req.body); // Ajuste o '/api/events'
    res.status(response.status).json(response.data);
  } catch (error: any) {
    if (next) return next(error);
    throw error;
  }
}
