const catchAsync = require("../utils/cathAsync");
const taskService = require('../services/task.service')
const httpStatus = require("http-status");

const addTask = catchAsync(async (req,res)=>{
    const { userId } = req.user;
    const task = await taskService.createTask(userId,req.body);
    res.status(httpStatus.OK).json(task);
});

const removeTask = catchAsync(async (req,res)=> {
    const taskId = parseInt(req.params.taskId);
    const { userId } = req.user;
    await taskService.deleteTask(userId,taskId);
    res.status(httpStatus.NO_CONTENT).send();
});

const getAllUserTasks = catchAsync(async (req,res) => {
    const { userId } = req.user;
    const tasks = await  taskService.getAllTasks(userId);
    res.status(httpStatus.OK).json(tasks)
})

const updateTaskState = catchAsync(async (req,res) => {
    const { userId } = req.user;
    const taskId = parseInt(req.params.taskId);
    const taskUpdated = await taskService.updateTaskState(userId, taskId);
    res.status(httpStatus.OK).json(taskUpdated);
});
module.exports = {
    addTask,
    removeTask,
    getAllUserTasks,
    updateTaskState
}
