const express = require('express')
const router = express.Router()
const requestController = require('../controllers/requests.controller')

router.get('/', requestController.getAll)
router.get('/:request_id', requestController.getOne)
router.post('/create', requestController.create)
router.put('/:request_id/update', requestController.update)
router.delete('/:request_id/deleteOne', requestController.deleteOne)

module.exports = router
