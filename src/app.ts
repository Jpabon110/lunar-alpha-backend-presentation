import express from 'express';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import resourceRoutes from './routes/resourceRoutes';
import eventRoutes from './routes/eventRoutes';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { startCronJobs } from './cronJobs';
import { amqpService } from './services/amqpService';

const cors = require('cors');

const app = express();
dotenv.config();

app.use(morgan('dev')); 
app.use(express.json());

app.use(cors());

amqpService
  .connect()
  .then(async () => {
    await amqpService.consumeMessages(process.env.RABBITMQ_QUEUE as string);
    startCronJobs();
  })
  .catch(error => {
    console.error('Error iniciando servicios:', error);
    process.exit(1);
  });

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/resources', resourceRoutes);
app.use('/events', eventRoutes);

process.on('SIGTERM', async () => {
  await amqpService.closeConnection();
  process.exit(0);
});


export default app;
