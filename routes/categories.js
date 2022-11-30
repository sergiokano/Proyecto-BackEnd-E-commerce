const express = require('express');

const router = express.Router();

const CategoryController = require('../controllers/CategoryController')

router.post('/create', CategoryController.create)
router.put('/update/:id', CategoryController.update)
router.delete('/delete/:id', CategoryController.delete)
router.get('/findbyId/:id', CategoryController.getById)
router.get('/findbyName/:name', CategoryController.getOneByName)

module.exports = router;