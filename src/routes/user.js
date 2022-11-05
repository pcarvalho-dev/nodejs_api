const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const loginController = require('../controllers/login');

router.get('', userController.getUsers);
router.post('', userController.createUser);
router.get('/:id', userController.getById);
router.delete('/:id', userController.deleteUser);

// Login
router.post('/login', loginController.loginUser);

module.exports = router;
