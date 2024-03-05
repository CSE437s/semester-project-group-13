const donationService = require('../services/donation.service');

async function getAll(req, res, next) {
  try {
    res.json(await donationService.getAll());
  } catch (err) {
    console.error('Error while getting all donations', err.message);
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
      quantity,
      completed,
      giving_family,
      giving_volunteer,
      receiving_family,
      user_id,
    } = req.body;

    const result = await donationService.create({
      item,
      quantity,
      completed,
      giving_family,
      giving_volunteer,
      receiving_family,
      user_id,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error Creating Donation', error);
    res.status(500).json({ error: 'Error creating donation' });
  }
}

async function getAllIncomplete() {
    try {
      const query = 'SELECT * FROM donations WHERE completed = false';
      const results = await db.query(query);
      return results;
    } catch (error) {
      console.error('Error retrieving incomplete donations from the database', error);
      throw error;
    }
  }

module.exports = {
  getAll,
  getOne,
  create,
  getAllIncomplete,
};
