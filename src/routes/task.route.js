const { Router} = require('express');
const { addTask, removeTask,getAllUserTasks, updateTaskState } = require('../controllers/task.controller');
const { auth } = require('../middlewares/auth')
const router = Router();

router.post('/task/newTask',auth,addTask);
router.delete('/task/removeTask/:taskId',auth,removeTask);
router.get("/task/getAllUserTasks",auth,getAllUserTasks);
router.patch('/task/updateTaskState/:taskId', auth, updateTaskState);

module.exports = router;