const donationService = require('../services/donation.service');

async function getAll(req, res, next) {
  try {
    res.json(await donationService.getAll());
  } catch (err) {
    console.error('Error while getting all donations', err.message);
    next(err);
  }
}


async function getSome(req, res, next) {
  try {
      const { startIndex, limit } = req.query;
      res.json(await donationService.getSome(startIndex, limit));
  } catch (err) {
      console.error('Error while getting some donations', err.message);
      next(err);
  }
}


async function getOne(req, res, next) {
  try {
    const { donation_id } = req.params;
    res.json(await donationService.getOne(donation_id));
  } catch (err) {
    console.error('Error while getting one donation', err.message);
    next(err);
  }
}

async function create(req, res) {
  try {
    const {
      item,
      amount,
      completed,
      date,
      family_id,
      user_id,
    } = req.body;

    const result = await donationService.create({
      item,
      amount,
      completed,
      date,
      family_id,
      user_id,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error Creating Donation', error.message);
    res.status(500).json({ error: 'Error creating donation' });
  }
}

async function update(req, res) {
  try {
    const { donation_id } = req.params; 
    const {
      item,
      amount,
      completed,
    } = req.body;

    const result = await donationService.update({
      donation_id,
      item,
      amount,
      completed
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error Updating Donation', error.message);
    res.status(500).json({ error: 'Error updating donation' });
  }
}

async function deleteOne(req, res) {
  try {
    const { donation_id } = req.params; 
    const {
      is_deleted,
    } = req.body;

    const result = await donationService.deleteOne({
      donation_id,
      is_deleted
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error Deleting Donation', error.message);
    res.status(500).json({ error: 'Error Deleting donation' });
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  getSome,
};
