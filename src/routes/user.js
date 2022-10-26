const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('', userController.getUsers);
router.post('', userController.createUser);
router.get('/:id');

module.exports = router;
