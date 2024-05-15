const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { isEmailTaken, encriptPassword, isPasswordMatch } = require('../utils/utils')
const prisma = require('../connections/prismaClient')

const selectInfo = {
    id:true,
    name:true,
    lastName:true,
    email:true
   }

const createUser = async (user)=> {
    if(await isEmailTaken(user.email)){
        throw new ApiError(httpStatus.CONFLICT,"Email already taken");
    }
    user.password = await encriptPassword(user.password);
    const profile = await prisma.user.create({
       data: user,
       select:selectInfo
    })
    const categories = await createDefaultCategoriesForUser(profile.id);
    return {...profile, categories}

}

const createDefaultCategoriesForUser = async (id) => { 
    const defaultCategories = [{name:"Personal",description:"used for personal day-to-day tasks that involve work related to our private life.",img_url:"https://ufidcektxzpefvkilzak.supabase.co/storage/v1/object/sign/taskCategoryIcon/personal.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0YXNrQ2F0ZWdvcnlJY29uL3BlcnNvbmFsLnBuZyIsImlhdCI6MTcxMjQ2ODkyMSwiZXhwIjoxNzQ0MDA0OTIxfQ.pflgN8Slqsz98CGcIdBERvf81tz6dySfyBaKkrb5c1U&t=2024-04-07T05%3A48%3A43.084Z"},{name:"Work",description:"used for tasks related to our work that must be carried out with high responsibility",img_url:"https://ufidcektxzpefvkilzak.supabase.co/storage/v1/object/sign/taskCategoryIcon/work.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0YXNrQ2F0ZWdvcnlJY29uL3dvcmsucG5nIiwiaWF0IjoxNzEyNDY4OTM1LCJleHAiOjE3NDQwMDQ5MzV9.aPjE6dAIb6_GMjFh3scNOZIR2dwYvPHYVl2MrAvHx0o&t=2024-04-07T05%3A48%3A57.121Z"},{name:"Shopping",description:"Used for household or personal shopping tasks.",img_url:"https://ufidcektxzpefvkilzak.supabase.co/storage/v1/object/sign/taskCategoryIcon/carro.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0YXNrQ2F0ZWdvcnlJY29uL2NhcnJvLnBuZyIsImlhdCI6MTcxMjQ2ODg0NywiZXhwIjoxNzQ0MDA0ODQ3fQ.V0enL1fbozcMrWpnqqLQoIZTVlUjacd5anCRljyIXXQ&t=2024-04-07T05%3A47%3A29.153Z"}];
    const categories = [];
    defaultCategories.forEach(async (category) => {
        const newCategory = await prisma.category.create({
            data:{
                userId:id,
                name:category.name,
                description:category.description,
                img_url:category.img_url,
            }
        })
        categories.push(newCategory);
    })

    return categories;
}


const loginWithToken = async (id) => {
    const profile = await prisma.user.findFirst(
        {
            where: {id},
            select:{...selectInfo},
        },
    );
   if(!profile){
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
   }

   return profile;
}

const loginWithEmailAndPassword = async (email, password) => {
    const profile = await prisma.user.findFirst({
        where:{
            email,
        },
       select:{...selectInfo,password:true,categories:true}
    });
    
    if(!profile || !await isPasswordMatch(password,profile.password)){
        throw new ApiError(httpStatus.NOT_FOUND,'profile not found');
    }
    const {password:P,...profileWithoutPassword} = profile;
    return profileWithoutPassword;
}

const logout = async (token) => {
    const tokenDoc = await prisma.token.findFirst({where:{token}});
    if(!tokenDoc) throw new ApiError(httpStatus.NOT_FOUND,'token not found');
    await prisma.token.delete({where:{id:tokenDoc.id}})
}


module.exports ={
    createUser,
    loginWithToken,
    loginWithEmailAndPassword,
    logout
}