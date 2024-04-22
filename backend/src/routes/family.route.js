const express = require('express');
const router = express.Router();
const familyController = require('../controllers/family.controller');

router.get('/', familyController.getAll);
router.get('/some', familyController.getSome);
router.get('/familiesPerCountry', familyController.getFamiliesPerCountry);
router.get('/:family_id', familyController.getOne);
router.post('/create', familyController.create);
router.put('/:family_id/update', familyController.update); 
router.delete('/:family_id/deleteOne', familyController.deleteOne);




module.exports = router;