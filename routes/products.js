const express = require('express');

const router = express.Router();

const ProductController = require('../controllers/ProductController');
const { authentication } = require('../middleware/authentication');

router.post('/create', authentication, ProductController.create)
router.put('/update/:id', authentication, ProductController.update)
router.delete('/delete/:id', authentication, ProductController.delete)
router.get('/getAll', ProductController.getProductCategories)
router.get('/findbyId/:id', ProductController.getById)
router.get('/findbyName/:name', ProductController.getOneByName)
router.get('/findbyPrice/:price', ProductController.getOneByPrice)
router.get('/orderbyPrice', ProductController.orderByPrice)

module.exports = router;
