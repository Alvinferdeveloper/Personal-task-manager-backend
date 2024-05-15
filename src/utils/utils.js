const bcrypt = require('bcrypt');
const prisma = require('../connections/prismaClient')

const isEmailTaken = async (email)=> {
    const user = await prisma.user.findFirst({where: {email}});
    return !!user
}

const encriptPassword = (password) => {
    return bcrypt.hash(password,8)
}

const isPasswordMatch = (password, hash) => {
    return bcrypt.compare(password,hash)
}

module.exports = {
    isEmailTaken,
    encriptPassword,
    isPasswordMatch
}