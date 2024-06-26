const express = require('express');
const router = express.Router();
const prototypesController = require('../controllers/prototypes.controller');

router.get('/', prototypesController.getAll);
router.get('/some', prototypesController.getSome);
router.get('/:id', prototypesController.getOne);
router.post('/create', prototypesController.create); 
router.put('/:id/update', prototypesController.update); 
router.delete('/:id/deleteOne', prototypesController.deleteOne);

module.exports = router;
