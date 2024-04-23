const express = require('express');
const router = express.Router();
const geocodeController = require('../controllers/geocode.controller');
const axios = require('axios');

router.get('/', geocodeController.getAll);
router.get('/geocodeFamilies', geocodeController.getGeocodeFamilies);
router.get('/geocodeAndFamily', geocodeController.getGeocodeAndFamily);
router.post('/geocode-families', geocodeController.geocodeFamilies);
router.get('/:geocode_id', geocodeController.getOne);
router.post('/create', geocodeController.create);
router.post('/geocode-family', geocodeController.geocode);
router.put('/:geocode_id/update', geocodeController.update); 
router.delete('/:geocode_id/deleteOne', geocodeController.deleteOne);


module.exports = router;
