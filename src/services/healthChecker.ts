import axios from 'axios';
import IntanceModel from '../models/Instance';
import * as dotenv from 'dotenv';
import logger from './logger';
dotenv.config();

// Carrega as URLs das instâncias a partir das variáveis de ambiente
const selectUrls = process.env.SELECT_INSTANCES?.split(',');
const insertUrls = process.env.INSERT_INSTANCES?.split(',');
const updateUrls = process.env.UPDATE_INSTANCES?.split(',');
const deleteUrls = process.env.DELETE_INSTANCES?.split(',');
const locaisUrls = process.env.LOCAIS_INSTANCES?.split(',');

// Objeto que armazena as URLs configuradas e as URLs disponíveis para cada serviço
const services: Record<string, IntanceModel> = {
  select: {
    name: 'select',
    urls: selectUrls || [],
    available: []
  },
  insert: {
    name: 'insert',
    urls: insertUrls || [],
    available: []
  },
  update: {
    name: 'update',
    urls: updateUrls || [],
    available: []
  },
  delete: {
    name: 'delete',
    urls: deleteUrls || [],
    available: []
  },
  locais: {
    name:'locais',
    urls: locaisUrls || [],
    available: []
  }

};

// Função para verificar a saúde das instâncias e atualizar a lista de disponíveis
async function checkHealth() {
  for (const [key, service] of Object.entries(services)) {
    const available: string[] = [];
    for (const url of service.urls) {
      try {
        await axios.get(`${url}/health`); // Tenta acessar o endpoint /health da instância
        available.push(url); // Adiciona à lista de disponíveis se responder com sucesso
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
        logger.warn(`[HEALTH CHECK] Serviço ${key} indisponível em ${url} - ${errorMessage}`);
      }
    }
    services[key].available = available; // Atualiza a lista de URLs disponíveis para o serviço
  }
}

// Executa o health check periodicamente (a cada 5 segundos)
setInterval(checkHealth, 5000);
checkHealth(); // Executa uma vez no início

// Função para obter a próxima instância disponível usando Round-Robin
export function getAvailableInstance(serviceName: string): string | null {
  const service = services[serviceName];
  if (!service || service.available.length === 0) {
    return null; // Retorna null se o serviço não existe ou não tem instâncias disponíveis
  }

  const url = service.available.shift()!; // Remove a primeira URL (Round-Robin)
  service.available.push(url); // Adiciona a URL removida ao final da fila
  return url;
}
