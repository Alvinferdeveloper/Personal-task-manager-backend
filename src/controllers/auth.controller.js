const httpStatus = require('http-status');
const  authService = require('../services/auth.service')
const tokenService = require('../services/token.service');
const catchAsync = require('../utils/cathAsync');

const register = catchAsync(async (req, res) => {
    const perfil = await authService.createUser(req.body);
    const { token } = await tokenService.generateAuthToken(perfil);
    res.status(httpStatus.OK).json({...perfil, token});
})

const loginWithToken = catchAsync(async (req, res) => {
    const perfil = await authService.loginWithToken(req.user.userId);
    res.status(httpStatus.OK).json(perfil)
})

const loginWithEmailAndPassword = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const perfil = await authService.loginWithEmailAndPassword(email, password);
    const { token } = await tokenService.generateAuthToken(perfil);
    res.status(httpStatus.OK).json({...perfil,token});
});

const logout = catchAsync(async (req, res)=> {
    const { token } = req.body;
    await authService.logout(token);
    res.status(httpStatus.NO_CONTENT).send();
})
module.exports = {
    register,
    loginWithToken,
    loginWithEmailAndPassword,
    logout
}
