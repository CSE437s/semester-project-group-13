const { request } = require('express');
const requestService = require('../services/requests.service');

async function getAll(req, res, next) {
  try {
    res.json(await requestService.getAll());
  } catch (err) {
    console.error('Error while getting all requests', err.message);
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const { request_id } = req.params;
    res.json(await requestService.getOne(request_id));
  } catch (err) {
    console.error('Error while getting one request', err.message);
    next(err);
  }
}

async function create(req, res) {
  try {
    const {
      family_id,
      date,
      item,
      amount,
      completed,
      is_deleted,
      user_id,
    } = req.body;

    const result = await requestService.create({
      family_id,
      date,
      item,
      amount,
      completed,
      is_deleted,
      user_id,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error Creating Request', error.message);
    res.status(500).json({ error: 'Error creating request' });
  }
}

async function update(req, res) {
  try {
    const { request_id } = req.params; 
    const {
      family_id,
      date,
      item,
      amount,
      completed,
      is_deleted,
      user_id,
    } = req.body;

    const result = await requestService.update({
      request_id,
      family_id,
      date,
      item,
      amount,
      completed,
      is_deleted,
      user_id,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error Updating Request', error.message);
    res.status(500).json({ error: 'Error updating request' });
  }
}

async function deleteOne(req, res) {
  try {
    const { request_id } = req.params;
    await requestService.deleteOne(request_id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting request', error.message);
    res.status(500).json({ error: 'Error deleting request' });
  }
}


async function deleteOne(req, res) {
  try {
    const { request_id } = req.params; 
    const { is_deleted } = req.body;

    const result = await requestService.deleteOne(request_id, is_deleted);

    res.status(200).json(result);
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      console.error('Error Deleting Request: This request is referenced by other records.');
      return res.status(400).json({ error: 'This request is referenced by other records and cannot be deleted.' });
    }

    console.error('Error Deleting Request', error);
    res.status(500).json({ error: 'Error Deleting Request' });
  }
}
module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
