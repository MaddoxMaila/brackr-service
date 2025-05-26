// task-module.ts
import Queue from 'bull';
import { LOGGER } from '../libs/logger';

export interface TaskData {
  [key: string]: any;
}

export interface TaskModule {
  process: (callback: (data: TaskData) => Promise<any>) => void;
  add: (data: TaskData) => void;
  queue: Queue.Queue;
}

export default function (queueName: string): TaskModule {
  const queue = new Queue(queueName, {
    redis: {
      host: process.env.REDIS_HOST!,
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 0
    }
  });

  queue.isReady().then(() => {
    LOGGER("CELERY-BULL", "connected to redis.")
  }).catch(() => {
    LOGGER("CELERY-BULL", "Redis connection failed.")
  })

  queue.on("failed", () => {
    LOGGER("CELERY-BULL", `queue ${queueName} failed to process`)
  })

  return {
    queue: queue,
    process: (callback) => {
      queue.process(async (job) => {
         await callback(job.data);
         queue.on("completed", () => {
          LOGGER("CELERY-BULL", `queue ${queueName} processing finished!`)
         })
      });
    },
    add: (data) => {
      queue.add(data);
    }
  }
};
