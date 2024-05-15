
const httpStatus = require('http-status');
const prisma = require('../connections/prismaClient');
const ApiError = require('../utils/ApiError');

const createCategory = async (userId, category) => {
    const categoryDoc = await prisma.category.create({
        data:{
            img_url:"https://ufidcektxzpefvkilzak.supabase.co/storage/v1/object/sign/taskCategoryIcon/custom_category.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0YXNrQ2F0ZWdvcnlJY29uL2N1c3RvbV9jYXRlZ29yeS5wbmciLCJpYXQiOjE3MTQyODk3NzEsImV4cCI6MTc0NTgyNTc3MX0.BD3_DsO_rMUp30JzvHOry46vu1g6m7hjREMkOBFPm4A&t=2024-04-28T07%3A36%3A15.609Z",
            user:{connect:{id:userId}},
            ...category,
            
           
        }
    })

    return categoryDoc;
}

const deleteCategory = async (userId, categoryId) => {
    await prisma.category.delete({where:{id:categoryId,userId:userId}}).catch(() => {
        throw new ApiError(httpStatus.NOT_FOUND,"category Not Found");
    });
};

const getCategories = async (userId ) => {
    return prisma.category.findMany({
        where:{userId},
        include:{tasks:true}
    })
}

const getTotalTasksForUser = async (userId) => {
    const tasksForUser = await prisma.user.findUnique({
        where: {
            id:userId // Filtrar por el ID del usuario
        },
        include: {
            categories: {
                include: {
                    tasks: true // Incluir todas las tareas relacionadas con las categorías
                }
            }
        }
    });
    let totalTasksForUser = 0;
    tasksForUser.categories.forEach(category => {
        totalTasksForUser += category.tasks.length;
    })
    return totalTasksForUser;
}



module.exports = {
    createCategory,
    deleteCategory,
    getCategories,
    getTotalTasksForUser,
}