const express = require('express');

const router = express.Router();

const OrderController = require('../controllers/OrderController');

router.post('/create', OrderController.create)
router.get('/getAll', OrderController.getAllOrders)

module.exports = router;