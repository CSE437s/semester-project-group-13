const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donation.controller');

router.get('/', donationController.getAll);
router.get('/some', donationController.getSome);
router.get('/:donation_id', donationController.getOne);
router.post('/create', donationController.create); 
router.put('/:donation_id/update', donationController.update); 
router.delete('/:donation_id/deleteOne', donationController.deleteOne);


module.exports = router;
