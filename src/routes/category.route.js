const { Router} = require('express');
const { addCategory,removeCategory, getCategories } = require('../controllers/category.controller');
const { auth }= require('../middlewares/auth')

const router = Router();

router.post('/category/newCategory',auth,addCategory);
router.delete('/category/removeCategory/:categoryId',auth,removeCategory);
router.get('/category/getCategories',auth,getCategories);

module.exports = router;