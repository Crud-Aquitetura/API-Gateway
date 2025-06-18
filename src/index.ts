import express from 'express';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/logger';
import * as dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import eventsRouter from './routes/index';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); // CORS habilitado para todas as origens por padrão

// Health check endpoint - ADD THIS
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Rotas principais
app.use('/', eventsRouter);

// Middlewares de tratamento de erro e logger (aplicados após as rotas)
app.use(loggerMiddleware);
app.use(errorHandler);

const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
