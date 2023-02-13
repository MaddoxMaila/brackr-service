// task-module.ts
import Queue from 'bull';

export interface TaskData {
  [key: string]: any;
}

export interface TaskModule {
  process: (callback: (data: TaskData) => Promise<any>) => void;
  add: (data: TaskData) => void;
}

export default function (queueName: string): TaskModule {
  const queue = new Queue(queueName, {
    redis: {
      host: '127.0.0.1',
      port: 6379
    }
  });

  return {
    process: (callback) => {
      queue.process(async (job) => {
        const result = await callback(job.data);
        return result;
      });
    },
    add: (data) => {
      queue.add(data);
    }
  }
};
