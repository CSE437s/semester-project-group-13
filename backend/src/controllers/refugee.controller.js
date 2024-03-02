const refugeeService = require('../services/refugee.service');


async function getAll(req, res, next) {
    try {
      res.json(await refugeeService.getAll());
    } catch (err) {
      console.error('Error while getting all refugees', err.message);
      next(err);
    }
  }
  
async function getOne(req, res, next) {
    try {
        const { refugee_id } = req.params;
        res.json(await refugeeService.getOne(refugee_id));
    } catch (err) {
        console.error('Error while getting one refugee', err.message);
        next(err);
    }
}

module.exports = {
    getAll,
    getOne,
};
