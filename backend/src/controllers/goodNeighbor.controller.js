const neigborService = require('../services/goodNeighbor.service');


async function getAll(req, res, next) {
    try {
      res.json(await neigborService.getAll());
    } catch (err) {
      console.error('Error while getting all neigbor', err.message);
      next(err);
    }
  }
  
async function getOne(req, res, next) {
    try {
        const { refugee_id } = req.params;
        res.json(await neigborService.getOne(neighbor_id));
    } catch (err) {
        console.error('Error while getting one neigbor', err.message);
        next(err);
    }
}

module.exports = {
    getAll,
    getOne,
};
