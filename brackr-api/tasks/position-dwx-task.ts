import { rmqProducer } from '../rabbitmq/RabbitMQProducer';
import taskModule, { TaskData } from './task-module';

export default () => {
    const processPositionQueue = taskModule('position-queue');

    processPositionQueue.process(async (data: TaskData) => {
        
        rmqProducer.sendMessage(data)

    });

    return processPositionQueue
}
