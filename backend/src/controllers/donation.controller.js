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

async function getAllIncomplete(req, res) {
    try {
      const incompleteDonations = await donationService.getAllIncomplete();
      res.status(200).json({ incompleteDonations });
    } catch (error) {
      console.error('Error retrieving incomplete donations', error);
      res.status(500).json({ error: 'Error retrieving incomplete donations' });
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

module.exports = {
  getAll,
  getOne,
  create,
  getAllIncomplete,
};
