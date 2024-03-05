const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donation.controller');

router.get('/', donationController.getAll);
router.get('/:donation_id', donationController.getOne);
router.post('/createDonation', donationController.create); 
router.get('/incomplete', donationController.getAllIncomplete); 


module.exports = router;
