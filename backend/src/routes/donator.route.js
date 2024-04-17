const express = require('express');
const router = express.Router();
const donatorController = require('../controllers/donator.controller');

router.get('/', donatorController.getAll);
router.get('/some', donatorController.getSome);
router.get('/:donator_id', donatorController.getOne);
router.post('/create', donatorController.create);
router.put('/:donator_id/update', donatorController.update); 
router.delete('/:donator_id/deleteOne', donatorController.deleteOne);



module.exports = router;