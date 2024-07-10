const taskController = require('../controllers/task.controller');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.middleware');

router.post('/', verifyToken, taskController.create);
router.get('/', verifyToken, taskController.read);
router.put('/:id', verifyToken, taskController.update);
router.delete('/:id', verifyToken, taskController.delete);

module.exports = router;