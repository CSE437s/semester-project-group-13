const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteer.controller');

router.get('/', volunteerController.getAll);
router.get('/:volunteer_id', volunteerController.getOne);
router.post('/create', volunteerController.create);
router.put('/:volunteer_id/update', volunteerController.update); 
router.delete('/:volunteer_id/deleteOne', volunteerController.deleteOne);



module.exports = router;