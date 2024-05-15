const { Router} = require('express');
const { register, loginWithToken, loginWithEmailAndPassword,logout } = require("../controllers/auth.controller")
const { auth } = require('../middlewares/auth');
const validate = require('../middlewares/validate')
const validation = require('../validations/auth.validation')
const router = Router();

router.post('/register',validate(validation.registrer),register);
router.post('/auth/login-token',auth,loginWithToken);
router.post('/auth/login-email-password',validate(validation.login),loginWithEmailAndPassword);
router.post('/auth/logout',validate(validation.logout),logout);



module.exports = router;