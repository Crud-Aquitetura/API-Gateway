// API_Gateway-main/src/controllers/deleteController.ts

import { Request, Response, NextFunction } from 'express';

import axios from 'axios';

export async function deleteController(req: Request, res: Response, next?: NextFunction) {
  const { id } = req.params;
  if (!id) return next && next({ status: 400, message: 'Campos obrigatórios: id' });



  try {
    // CONSTRÓI A URL COMPLETA para o endpoint de DELETE de eventos
    // O ID é adicionado após o caminho base do events. Ex: http://localhost:35729/api/events/123
    const response = await axios.delete(`${backendBaseUrl}/api/events/${id}`); // Ajuste o '/api/events'
    res.status(response.status).json(response.data);
  } catch (error: any) {
    if (next) return next(error);
    throw error;
  }
}
