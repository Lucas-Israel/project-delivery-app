const express = require('express');
const { UserController } = require('../controllers');

const router = express.Router();

const userController = new UserController();

router.get('/manager', userController.getAllUsers);

router.delete('/me', userController.deleteUser);

module.exports = router;