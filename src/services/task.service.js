const httpStatus = require("http-status");
const prisma = require("../connections/prismaClient");
const ApiError = require("../utils/ApiError");

const createTask = async (userId, task) => {
  const { categoryId, ...restOfTask } = task;
  const categoryIdParsed = parseInt(categoryId);
  const categoryDoc = await prisma.category.findFirst({
    where: { id: categoryIdParsed, userId },
  });
  if (!categoryDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "category not found");
  }

  const taskDoc = await prisma.task.create({
    data: {
      category: { connect: { id: categoryIdParsed } },
      ...restOfTask,
    },
  });

  return taskDoc;
};

const deleteTask = async (userId, taskId) => {
  const deletedTask = await prisma.task.deleteMany({
    where: {
      id: taskId,
      category: {
        userId,
      },
    },
  });
  if (deletedTask.count === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "task not found");
  }

  return deletedTask;
};

const getAllTasks = async (userId) => {
  return await prisma.task.findMany({ where: { category: { userId } } });
};

const updateTaskState = async (userId, taskId) => {
  const existingData = await prisma.task.findFirst({
    where: {
      AND: [{ id: taskId }, { category: { userId } }],
    },
  });
  if (!existingData)
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  const newData = { ...existingData, state: !existingData.state };
  console.log(newData);
  return await prisma.task.update({
    where: {
        id:taskId,
      AND: [{ category: { userId:userId } }],
    },
    data: newData,
  });
};

const countOfTasks = async (userId) => {
  return await prisma.task.count({ where: { category: { userId } } });
};

module.exports = {
  createTask,
  deleteTask,
  getAllTasks,
  countOfTasks,
  updateTaskState
};
