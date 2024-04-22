const express = require('express');
const router = express.Router();
const geocodeController = require('../controllers/geocode.controller');

router.get('/', geocodeController.getAll);
router.get('/:geocode_id', geocodeController.getOne);
router.get('/geocodeFamilies', geocodeController.getGeocodeFamilies);
router.post('/create', geocodeController.create);
router.post('/geocode-families', geocodeController.geocodeFamilies);
router.post('/geocode-family', geocodeController.geocode);
router.put('/:geocode_id/update', geocodeController.update); 
router.delete('/:geocode_id/deleteOne', geocodeController.deleteOne);


module.exports = router;
