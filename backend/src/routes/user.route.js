const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);

router.get('/:user_id', userController.getOneUser);

router.post('/create', userController.createUser);

module.exports = router;