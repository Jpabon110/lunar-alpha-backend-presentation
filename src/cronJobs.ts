import cron from 'node-cron';
import { amqpService } from './services/amqpService';

const ResourceTypes = [
  'Oxygen',
  'Food',
  'Energy',
];

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const startCronJobs = async () => {

  cron.schedule(process.env.CRONTAB as string, async () => {
    console.log('Running cronjob...');
    const queue = process.env.RABBITMQ_QUEUE as string;
    
    const event = {
      resource: ResourceTypes[generateRandomNumber(0, 2)],
      level: generateRandomNumber(20, 100),
    };

    try {
      await amqpService.publishMessage(queue, event);
      console.log(' [x] Sent:', event);
    } catch (err) {
      console.warn(err);
    }
  });

  console.log('Cronjob inicializado');
};
