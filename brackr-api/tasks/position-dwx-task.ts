import taskModule, { TaskData } from './task-module';

const processPositionQueue = taskModule('position-queue');

processPositionQueue.process(async (data: TaskData) => {
    console.log("Processing position data")
});

export default processPositionQueue