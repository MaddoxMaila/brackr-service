import amqp from 'amqplib'
import { LOGGER } from '../../libs/logger';

export class RabbitConsumer {
    exchange: string
    queue: string
    connection: amqp.Connection | undefined
    channel: amqp.Channel | undefined
    
    constructor(exchange: string = "", queue: string = ""){

        this.exchange = exchange || process.env.RABBIT_EXCHANGE || ""
        this.queue = queue || process.env.RABBIT_QUEUE || ""

    }

    async connect(){
        try {
            this.connection = await amqp.connect('amqp://localhost');
            
            ["error", "close"].forEach(listener => {
                this.connection && this.connection.on(listener, e => {
                    LOGGER("RABBITMQ", `connection ${listener} : ${e}`)
                })
            })

            await this.createChannel(this.connection)

        } catch (e: any) {
            LOGGER("RABBITMQ", e)
        }
    }

    async createChannel(connection: amqp.Connection){
        try {
            this.channel = await connection.createChannel()
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

export const StartRabbitMQConsumer = async () => {
    const rmqConsumer = new RabbitConsumer("brckr.pos", "brckr.pos.q")
    await rmqConsumer.connect()
    await rmqConsumer.receiveMessage()
}

