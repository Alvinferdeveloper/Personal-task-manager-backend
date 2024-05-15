const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const tokenService = require("../services/token.service");
const catchAsync = require("../utils/cathAsync");
const jwt = require("jwt-simple");
const moment = require("moment");

const isTokenExpired = (payload) => {
  return payload.exp < moment().unix() ? true : false;
};

const tokenValidation = async (token) => {
    //decode throw an exception when the expiration of the token multiplied by 1000 is greater than the current date
    let payload;
    try{
        payload = jwt.decode(token, process.env.JWT_SECRET);
        const tokenExpired = isTokenExpired(payload);
        if (tokenExpired) {
          throw new Error("Token expired");
        }
    }catch(err){
        await tokenService.deleteToken(token);
        throw new ApiError(httpStatus.UNAUTHORIZED,err.message)
    }

    const registered = await tokenService.isTokenRegistered(token);
    if(!registered){
        throw new ApiError(httpStatus.UNAUTHORIZED,"Invalid Token")
    }
  return payload;
};

const auth = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;
  const userInfoFromToken = await tokenValidation(token);
  req.user = userInfoFromToken;
  next();
});

module.exports = {
  auth,
};
