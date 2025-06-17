// API_Gateway-main/src/controllers/selectController.ts

import { Request, Response, NextFunction } from 'express';
import { getAvailableInstance } from '../services/healthChecker';
import axios from 'axios';

export async function selectController(req: Request, res: Response, next?: NextFunction) {
  const backendBaseUrl = getAvailableInstance('backend'); // Pega a URL base do backend
  if (!backendBaseUrl) {
    return next && next({ status: 503, message: 'Sem instância de backend disponível' });
  }

  try {
    // CONSTRÓI A URL COMPLETA para o endpoint de SELECT de eventos
    const response = await axios.get(`${backendBaseUrl}/api/events`); // Ajuste o '/api/events' se for diferente no seu backend
    res.status(response.status).json(response.data);
  } catch (error: any) {
    if (next) return next(error);
    throw error;
  }
}