const categoryController = require('../controllers/category.controller');
const express = require('express');
const router = express.Router();

router.post('/', categoryController.create);
router.get('/', categoryController.read);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router;