const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics.controller');

router.get('/category', statisticsController.getAll);
router.get('/somecategory', statisticsController.getSomeCategory);
router.get('/somedate', statisticsController.getSomeFromDate);
router.get('/date', statisticsController.getAllFromDate);

module.exports = router;

//For example try http://localhost:8080/statistics/category?table=families&column=city&value=St.%20Louis

//Or http://localhost:8080/statistics/category?table=families&column=CountryOfOrigin&value=Cuba

//Or for date http://localhost:8080/statistics/date?table=families&column=CountryOfOrigin&value=Cuba&startDate=2023-01-01&endDate=2024-12-31&dateColumn=dateCreated

//Just be careful because not much error handling yet.

//Test for someCategory http://localhost:8080/statistics/somecategory?table=donators&column=city&value=Kirkwood&startIndex=1&limit=6
//Test for someDate http://localhost:8080/statistics/somedate?table=families&column=CountryOfOrigin&value=Cuba&startDate=2023-01-01&endDate=2024-12-31&dateColumn=dateCreated&startIndex=1&limit=4
