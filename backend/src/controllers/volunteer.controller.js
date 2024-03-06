const volunteerService = require('../services/volunteer.service');


async function getAll(req, res, next) {
    try {
      res.json(await volunteerService.getAll());
    } catch (err) {
      console.error('Error while getting all volunteers', err.message);
      next(err);
    }
  }
  
async function getOne(req, res, next) {
    try {
        const { volunteer_id } = req.params;
        res.json(await volunteerService.getOne(volunteer_id));
    } catch (err) {
        console.error('Error while getting one volunteer', err.message);
        next(err);
    }
}


async function create(req, res) {
  try {
    const {
        first_name,
        last_name,
        date_of_birth,
        phone_number,
        user_id,
        family_id
    } = req.body;

    const result = await volunteerService.create({
        first_name,
        last_name,
        date_of_birth,
        phone_number,
        user_id,
        family_id
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error Creating volunteer', error);
    res.status(500).json({ error: 'Error creating volunteer' });
  }
}


module.exports = {
    getAll,
    getOne,
    create,
};
