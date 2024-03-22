const neighborService = require('../services/goodNeighbor.service');

async function getAll(req, res, next) {
  try {
    res.json(await neighborService.getAll());
  } catch (err) {
    console.error('Error while getting all neighbors', err.message);
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const { neighbor_id } = req.params;
    res.json(await neighborService.getOne(neighbor_id));
  } catch (err) {
    console.error('Error while getting one neighbor', err.message);
    next(err);
  }
}

async function create(req, res) {
  try {
    const {
      refugee_family_id,
      host_family_id,
      match_date,
      neighbor_id
    } = req.body;

    const result = await neighborService.create({
      refugee_family_id,
      host_family_id,
      match_date,
      neighbor_id
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error Creating Neighbor', error.message);
    res.status(500).json({ error: 'Error creating neighbor' });
  }
}

async function update(req, res) {
  try {
    const { neighbor_id } = req.params;
    const {
      refugee_family_id,
      host_family_id,
      match_date,
    } = req.body;

    const result = await neighborService.update({
      neighbor_id,
      refugee_family_id,
      host_family_id,
      match_date,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating Neighbor', error.message);
    res.status(500).json({ error: 'Error updating neighbor' });
  }
}

async function deleteOne(req, res) {
  try {
    const { neighbor_id } = req.params;
    await neighborService.deleteOne(neighbor_id);
    res.status(200).json({ success: true });
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      console.error('Error deleting neighbor: This neighbor is referenced by other records.');
      return res.status(400).json({ error: 'This neighbor is referenced by other records and cannot be deleted.' });
    }

    console.error('Error deleting neighbor', error.message);
    res.status(500).json({ error: 'Error deleting neighbor' });
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
