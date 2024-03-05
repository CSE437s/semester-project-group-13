const express = require('express');
const router = express.Router();
const familyController = require('../controllers/family.controller');

router.get('/', familyController.getAll);
router.get('/:family_id', familyController.getOne);

module.exports = router;