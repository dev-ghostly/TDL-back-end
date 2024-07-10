const categoryController = require('../controllers/category.controller');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.middleware');

router.post('/', verifyToken, categoryController.create);
router.get('/', verifyToken, categoryController.read);
router.put('/:id', verifyToken, categoryController.update);
router.delete('/:id', verifyToken, categoryController.delete);

module.exports = router;