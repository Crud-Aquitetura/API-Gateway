// API_Gateway-main/src/controllers/updateController.ts

import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { EventModel } from '../models/Event';

export async function updateController(req: Request, res: Response, next?: NextFunction) {
  // ... (Validação dos campos obrigatórios permanece a mesma)
  const { nome, descricao, data_inicio, data_fim, local_id, status, preco_entrada, imagem_url } =
    req.body as Partial<EventModel>;
  const { id } = req.params;

  if (!id) return next && next({ status: 400, message: 'Campos obrigatórios: id' });
  if (!nome) return next && next({ status: 400, message: 'Campos obrigatórios: nome' });
  if (!data_inicio) return next && next({ status: 400, message: 'Campos obrigatórios: data_inicio' });
  if (!data_fim) return next && next({ status: 400, message: 'Campos obrigatórios: data_fim' });
  if (!local_id) return next && next({ status: 400, message: 'Campos obrigatórios: local_id' });
  if (!status) return next && next({ status: 400, message: 'Campos obrigatórios: status' });
  if (!preco_entrada) return next && next({ status: 400, message: 'Campos obrigatórios: preco_entrada' });
  if (!imagem_url) return next && next({ status: 400, message: 'Campos obrigatórios: imagem_url' });



  try {
    // CONSTRÓI A URL COMPLETA para o endpoint de UPDATE de eventos
    // O ID é adicionado após o caminho base do events. Ex: http://localhost:35729/api/events/123
    const response = await axios.put(`${backendBaseUrl}/api/events/${id}`, req.body); // Ajuste o '/api/events'
    res.status(response.status).json(response.data);
  } catch (error: any) {
    if (next) return next(error);
    throw error;
  }
}
