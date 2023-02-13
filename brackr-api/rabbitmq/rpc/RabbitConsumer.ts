import amqp from 'amqplib'
import { Connection, Channel, ConsumeMessage } from 'amqplib';
import { LOGGER } from '../../libs/logger';

export class RabbitConsumer {
    exchange: string
    queue: string
    connection: amqp.Connection | undefined
    channel: amqp.Channel | undefined
    
    constructor(exchange: string, queue: string){

        this.exchange = exchange || process.env.RABBIT_EXCHANGE || ""
        this.queue = queue || process.env.RABBIT_QUEUE || ""

        this.connect()
        this.createChannel()

    }

    async connect(){
        try {
            this.connection = await amqp.connect('amqp://localhost');
        } catch (e: any) {
            LOGGER("RABBITMQ", e)
        }
    }

    async createChannel(){
        try {
            this.channel = this.connection && await this.connection.createChannel()
        } catch (e: any) {
            LOGGER("RABBITMQ", e)
        }
    }

    async receiveMessage(): Promise<void> {
        try {

            if(!this.channel) throw new Error("Channel is undefined.")
            
            this.channel.assertQueue(this.queue, { durable: true });
            console.log(`Waiting for messages in queue "${this.queue}"`);
        
            this.channel.consume(this.queue, (message: amqp.ConsumeMessage | null) => {
                if (!message) {
                    LOGGER("RABBITMQ", "RECEIVED EMPTY MESSAGE")
                    return;
                }
        
                console.log(JSON.parse(message.content.toString()))
                this.channel && this.channel.ack(message);
            });

        } catch (e: any) {
            LOGGER("RABBITMQ", `RECEIVE MESSAGE FAILED - ${e}`)
        }
    };

}

