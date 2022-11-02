const express = require('express');

const router = express.Router();

const ProductController = require('../controllers/ProductController')

router.post('/createProduct', ProductController.create)

router.get('/', ProductController.getAll)

// router.post('/createProduct', ProductController.createProduct)

module.exports = router;