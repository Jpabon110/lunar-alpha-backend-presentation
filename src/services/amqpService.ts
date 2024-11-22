import amqp, { Connection, Channel, ConsumeMessage } from 'amqplib';
import { createEventService } from './eventService';
import { editResourceService } from './resourceService';

class AmqpService {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  async connect(retries = 5, delay = 5000) {
    try {
      if (!this.connection) {
        this.connection = await amqp.connect(process.env.RABBITMQ_URL as string);
        this.channel = await this.connection.createChannel();
        console.log('Conectado a RabbitMQ');
      }
      return this.channel;
    } catch (error) {
      if (retries > 0) {
        console.log(`Reintentando conexión en ${delay/1000} segundos...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        this.connect(retries - 1, delay);
      } else {
        console.error('Error conectando a RabbitMQ:', error);
        throw error;
      }
    }
  }

  async publishMessage(queue: string, message: any) {
    try {
      if (!this.channel) {
        await this.connect();
      }
      await this.channel?.assertQueue(queue, { durable: false });
      this.channel?.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      console.error('Error publicando mensaje:', error);
      throw error;
    }
  }

  async closeConnection() {
    try {
      await this.channel?.close();
      await this.connection?.close();
      this.channel = null;
      this.connection = null;
    } catch (error) {
      console.error('Error cerrando conexión:', error);
    }
  }

  async consumeMessages(queue: string) {
    try {
      if (!this.channel) {
        await this.connect();
      }
      
      await this.channel?.assertQueue(queue, { durable: false });
      
      this.channel?.consume(queue, async (message: ConsumeMessage | null) => {
        if (message) {
          const content = JSON.parse(message.content.toString());
          console.log('content', content);
          const { resource, level } = content;
          const isCritical = level < 50;
          
          const description = isCritical 
            ? `¡CRÍTICO! Nivel bajo de ${resource}: ${level}%`
            : `Nivel aceptable de ${resource}: ${level}%`;

          try {
            await editResourceService(resource, {
              level,
              critical: isCritical
            });

            await createEventService({
              description,
              assignee: resource,
              levelResource: level,
              critical: isCritical,
            });
            
            this.channel?.ack(message);
            console.log('Recurso actualizado y evento guardado:', description);
          } catch (error) {
            console.error('Error procesando mensaje:', error);
            this.channel?.nack(message);
          }
        }
      });
      
      console.log('Consumidor de mensajes iniciado');
    } catch (error) {
      console.error('Error configurando consumidor:', error);
      throw error;
    }
  }
}

export const amqpService = new AmqpService();
