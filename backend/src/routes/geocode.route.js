const express = require('express');
const router = express.Router();
const geocodeController = require('../controllers/geocode.controller');

router.get('/', geocodeController.getAll);
router.get('/:geocode_id', geocodeController.getOne);
router.post('/create', geocodeController.create);
//router.post('/geocode', geocodeController.geocode);
router.put('/:geocode_id/update', geocodeController.update); 
router.delete('/:geocode_id/deleteOne', geocodeController.deleteOne);


module.exports = router;
