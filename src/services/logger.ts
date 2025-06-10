// API_Gateway-main/src/services/logger.ts
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// A função de formatação do log
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// Configuração do logger
const logger = createLogger({
  level: 'info', // Nível de log padrão
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat)
    }),
    new transports.File({
      filename: 'logs/error.log', // Loga erros neste arquivo
      level: 'error',
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat)
    }),
    new transports.File({
      filename: 'logs/combined.log', // Loga tudo neste arquivo
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat)
    })
  ]
});

// Exporta o logger para ser usado em outros módulos
export default logger;