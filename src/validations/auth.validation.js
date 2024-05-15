const Joi = require('joi');

const registrer = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    lastName: Joi.string().min(3).max(100),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,}$/)).required(),
});

const login = Joi.object({
    password:Joi.string().required(),
    email:Joi.string().required()
})

const logout = Joi.object({
    token:Joi.string().required()
})
module.exports = {
    registrer,
    login,
    logout
}