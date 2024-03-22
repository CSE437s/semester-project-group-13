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
      refugee_id,
      family_id,
      date,
      item,
      quantity,
      fulfilled,
      user_id,
    } = req.body;

    const result = await requestService.create({
      refugee_id,
      family_id,
      date,
      item,
      quantity,
      fulfilled,
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
      refugee_id,
      family_id,
      date,
      item,
      quantity,
      fulfilled,
      user_id,
    } = req.body;

    const result = await requestService.update({
      request_id,
      refugee_id,
      family_id,
      date,
      item,
      quantity,
      fulfilled,
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

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
