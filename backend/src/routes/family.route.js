const express = require('express');
const router = express.Router();
const familyController = require('../controllers/family.controller');

router.get('/', familyController.getAll);
router.get('/:family_id', familyController.getOne);
router.get('/addresses', familyController.getAllAddresses);
router.post('/create', familyController.create);
router.put('/:family_id/update', familyController.update); 
router.delete('/:family_id/deleteOne', familyController.deleteOne);
router.get('/:family_id/getRefugees', familyController.getAllRefugeesInFamily);



module.exports = router;