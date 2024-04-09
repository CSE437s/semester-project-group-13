const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notes.controller')

router.get('/', notesController.getAll)
router.get('/:note_id', notesController.getOne)
router.post('/create', notesController.create)
router.put('/:note_id/update', notesController.update)
router.delete('/:note_id/deleteOne', notesController.deleteOne)

module.exports = router
