import express from 'express';
import taskRoutes from './src/routes/taskRoutes.js';
import config from './src/config/index.js';
import { handleError } from './src/utils/errorHandler.js';
import 'dotenv/config';

const { port } = config;

const app = express();
app.use(express.json());
app.use('/api', taskRoutes);    

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Acesse: http://localhost:${port}/api/tasks`);
});