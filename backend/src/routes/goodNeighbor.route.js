const express = require('express');
const router = express.Router();
const neighborController = require('../controllers/goodNeighbor.controller');

router.get('/', neighborController.getAll);
router.get('/:neighbor_id', neighborController.getOne);
router.post('/create', neighborController.create);  


module.exports = router;