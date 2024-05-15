const moment = require('moment');
const jwt = require('jwt-simple');
const { PrismaClient} = require('../../prisma/generated/client');
const prisma = new PrismaClient();

const generateToken = (userId, name, expires)=> {
    const payload = {
        userId,
        name,
        iat:moment().unix(),
        exp:expires
    }

    return jwt.encode(payload,process.env.JWT_SECRET)
}

const isTokenRegistered = async (token)=>{
    const tokenDoc = await prisma.token.findFirst({where:{token}});
    return !!tokenDoc;
}

const saveToken = (accessToken,userId, expires)=>{
    const tokenDoc = prisma.token.create({
        data:{
            token:accessToken,
            user:{connect:{id:userId}},
            expires
        },
        select:{token:true}
    })
    return tokenDoc;
}

const generateAuthToken = async ({id, name})=> {
    const expires = moment().add(2,'days').unix();
    const accessToken = generateToken(id, name, expires);
    return saveToken(accessToken, id, expires);
}


const deleteToken = async (token) => {
    await prisma.token.deleteMany({where:{token}});
}


module.exports = {
    generateAuthToken,
    isTokenRegistered,
    deleteToken,
}