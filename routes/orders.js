const express = require('express');

const router = express.Router();

const OrderController = require('../controllers/OrderController');
const { authentication } = require('../middleware/authentication');

router.post('/create', OrderController.create)
// router.get('/getAll', OrderController.getAll)

module.exports = router;