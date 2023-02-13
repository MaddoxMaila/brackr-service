import amqp from 'amqplib';
import { LOGGER } from '../libs/logger';


export default class RabbitMQProducer {

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

    async sendMessage(data: {[key: string]: any}){

        try {
            
            const messageBuffer = Buffer.from(JSON.stringify(data));

            const options: amqp.Options.Publish = {
                contentType: 'text/plain',
                contentEncoding: 'utf-8'
            };

            if(!this.channel) throw new Error("Rabbit channel undefined.")
        
            await this.channel.assertQueue(this.queue, { durable: true });
            this.channel.sendToQueue(this.queue, messageBuffer, options);

            LOGGER("RABBITMQ", `message sent % ${messageBuffer} %`)

        } catch (e: any) {
            LOGGER("RABBITMQ", `SEND MESSAGE FAILED - ${e}`)
        }

    }
}
