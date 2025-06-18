// API_Gateway-main/src/controllers/selectController.ts

import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { backendBaseUrl } from '../config'; // Ajuste o caminho se seu arquivo de config estiver em outro lugar

export async function selectController(req: Request, res: Response, next?: NextFunction) {


  try {
    // CONSTRÓI A URL COMPLETA para o endpoint de SELECT de eventos
    const response = await axios.get(`${backendBaseUrl}/api/events`); // Ajuste o '/api/events' se for diferente no seu backend
    res.status(response.status).json(response.data);
  } catch (error: any) {
    if (next) return next(error);
    throw error;
  }
}
