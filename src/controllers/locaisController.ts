
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export async function insertLocalController(req: Request, res: Response, next?: NextFunction) {

  try {
    const response = await axios.post(targetUrl, req.body); // Encaminha o POST
    res.status(response.status).json(response.data);
  } catch (error: any) {
    if (next) return next(error);
    throw error;
  }
}

export async function selectLocaisController(req: Request, res: Response, next?: NextFunction) {
    const targetUrl = getAvailableInstance('locais');
    if (!targetUrl) {
        return next && next({ status: 503, message: 'Sem instância de locais disponível' });
    }
    try {
        const response = await axios.get(targetUrl); // Encaminha o GET
        res.status(response.status).json(response.data);
    } catch (error: any) {
        if (next) return next(error);
        throw error;
    }
}
