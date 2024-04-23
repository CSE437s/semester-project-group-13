const { request } = require('express');
const statisticService = require('../services/statistics.service');


async function getTable(req, res, next) {
  try {
    const { table } = req.query;
    let result;

    if (table) {
      result = await statisticService.getTable(table);
    } else {
      result = await statisticService.getTable();
    }

    res.json(result);
  } catch (err) {
    console.error('Error while getting table', err.message);
    next(err);
  }
}

async function getAll(req, res, next) {
    try {
      const { table, column, value } = req.query;
      let result;
  
      if (table && column) {
        result = await statisticService.getAll(table, column, value);
      } else {
        result = await statisticService.getAll();
      }
  
      res.json(result);
    } catch (err) {
      console.error('Error while getting all requests', err.message);
      next(err);
    }
  }


  async function getSomeFromDate(req, res, next) {
    try {
      const { table, column, value, startDate, endDate, dateColumn, startIndex, limit } = req.query;
  
      const result = await statisticService.getSomeFromDate(
        table,
        column,
        value,
        startDate,
        endDate,
        dateColumn,
        startIndex,
        limit
      );
  
      res.json(result);
    } catch (error) {
      console.error('Error while getting statistics', error);
      next(error);
    }
  }

  async function getSomeCategory(req, res, next) {
    try {
      const { table, column, value, startIndex, limit } = req.query;
  
      const result = await statisticService.getSomeCategory(
        table,
        column,
        value,
        startIndex,
        limit,
      );
  
      res.json(result);
    } catch (error) {
      console.error('Error while getting requests', error);
      next(error);
    }
  }
  


  

  async function getAllFromDate(req, res, next) {
    try {
        const { table, column, value, startDate, endDate, dateColumn } = req.query;
        let result;

        if (startDate && endDate) {
            result = await statisticService.getAllFromDate(table, column, value, startDate, endDate, dateColumn);
        } else {
            result = await statisticService.getAll(table, column, value);
        }

        res.json(result);
    } catch (err) {
        console.error('Error while getting all requests', err.message);
        next(err);
    }
}


module.exports = {
  getTable,
  getAll,
  getAllFromDate,
  getSomeCategory,
  getSomeFromDate,
};
