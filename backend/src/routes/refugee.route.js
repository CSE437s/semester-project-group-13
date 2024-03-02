const express = require('express');
const router = express.Router();
const refugeeController = require('../controllers/refugee.controller');

router.get('/', refugeeController.getAll);
router.get('/:refugee_id', refugeeController.getOne);

module.exports = router;