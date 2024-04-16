const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics.controller');

router.get('/category', statisticsController.getAll);

router.get('/date', statisticsController.getAllFromDate);

module.exports = router;

//For example try http://localhost:8080/statistics/category?column=families&category=city&value=St.%20Louis

//Or http://localhost:8080/statistics/category?column=families&category=CountryOfOrigin&value=Cuba

//Or for date http://localhost:8080/statistics/date?column=families&category=CountryOfOrigin&value=Cuba&startDate=2023-01-01&endDate=2024-12-31&dateColumn=dateCreated

//Just be careful because not much error handling yet.