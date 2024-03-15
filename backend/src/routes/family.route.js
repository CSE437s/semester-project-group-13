const express = require('express');
const router = express.Router();
const familyController = require('../controllers/family.controller');

router.get('/', familyController.getAll);
router.get('/:family_id', familyController.getOne);
router.post('/create', familyController.create);
router.put('/:family_id/update', familyController.update); 



module.exports = router;