const catchAsync = require("../utils/cathAsync");
const categoryService = require('../services/category.service');
const httpStatus = require("http-status");

const addCategory = catchAsync(async (req,res)=>{
    const { userId } = req.user;
    const category = await categoryService.createCategory(userId,req.body);
    res.status(httpStatus.OK).json(category);
});

const removeCategory = catchAsync(async (req,res)=> {
    const categoryId = parseInt(req.params.categoryId);
    const { userId } = req.user;
    await categoryService.deleteCategory(userId,categoryId);
    res.status(httpStatus.NO_CONTENT).send();
});

const getCategories = catchAsync(async (req,res)=>{
    const { userId } = req.user;
    const categories = await categoryService.getCategories(userId);
    const totalTasks = await categoryService.getTotalTasksForUser(userId);
    res.status(httpStatus.OK).json({categories, totalTasks});
});

module.exports = {
    addCategory,
    removeCategory,
    getCategories
}