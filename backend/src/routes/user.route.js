const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/', userController.getAll)
router.get('/:user_id', userController.getOne)
router.post('/create', userController.create)
router.put('/:user_id/update', userController.update)
router.delete('/:user_id/deleteOne', userController.deleteOne)

module.exports = router
