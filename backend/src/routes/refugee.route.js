const express = require('express');
const router = express.Router();
const refugeeController = require('../controllers/refugee.controller');

router.get('/', refugeeController.getAll);
router.get('/:refugee_id', refugeeController.getOne);
router.post('/create', refugeeController.create);


module.exports = router;