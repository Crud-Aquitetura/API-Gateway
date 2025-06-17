// API_Gateway-main/src/services/healthChecker.ts

import axios from 'axios';
import IntanceModel from '../models/Instance';
import * as dotenv from 'dotenv';
import logger from './logger';
dotenv.config();

const backendBaseUrl = process.env.BACKEND_BASE_URL; // Carrega a URL base

const services: Record<string, IntanceModel> = {
  backend: { // Apenas uma entrada para o backend principal de Eventos
    name: 'backend',
    urls: backendBaseUrl ? [backendBaseUrl] : [],
    available: []
  }
};

async function checkHealth() {
  const service = services.backend;
  const available: string[] = [];
  for (const url of service.urls) {
    try {
      await axios.get(`${url}/health`); // Assumes /health endpoint on your single backend
      available.push(url);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
      logger.warn(`[HEALTH CHECK] Serviço backend indisponível em ${url} - ${errorMessage}`);
    }
  }
  services.backend.available = available;
}

setInterval(checkHealth, 5000);
checkHealth();

export function getAvailableInstance(serviceName: string): string | null {
  const service = services.backend;
  if (!service || service.available.length === 0) {
    return null;
  }
  const url = service.available.shift()!;
  service.available.push(url);
  return url;
}