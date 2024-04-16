const { request } = require('express');
const statisticService = require('../services/statistics.service');


async function getAll(req, res, next) {
    try {
      const { column, category, value } = req.query;
      let result;
  
      if (category && column) {
        result = await statisticService.getAll(column, category, value);
      } else {

        result = await statisticService.getAll();
      }
  
      res.json(result);
    } catch (err) {
      console.error('Error while getting all requests', err.message);
      next(err);
    }
  }

  async function getAllFromDate(req, res, next) {
    try {
        const { column, category, value, startDate, endDate, dateColumn } = req.query;
        let result;

        if (startDate && endDate) {
            result = await statisticService.getAllFromDate(column, category, value, startDate, endDate, dateColumn);
        } else {
            result = await statisticService.getAll(column, category, value);
        }

        res.json(result);
    } catch (err) {
        console.error('Error while getting all requests', err.message);
        next(err);
    }
}


module.exports = {
  getAll,
  getAllFromDate,
};
