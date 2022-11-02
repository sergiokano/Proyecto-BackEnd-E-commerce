const express = require('express');

const router = express.Router();

const ProductController = require('../controllers/ProductController');
const { authentication } = require('../middleware/authentication');


router.post('/create', ProductController.create)
// router.get('/', ProductController.getAll)

router.delete('/delete/:id', ProductController.delete)

module.exports = router;