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


async function create(req, res) {
  try {
    const {
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      country_of_origin,
      date_of_arrival_to_us,
      date_of_joining_oasis,
      gender,
      email,
      family_id
    } = req.body;

    const result = await refugeeService.create({
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      country_of_origin,
      date_of_arrival_to_us,
      date_of_joining_oasis,
      gender,
      email,
      family_id
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error Creating Refugee', error);
    res.status(500).json({ error: 'Error creating refugee' });
  }
}

async function update(req, res) {
  try {
    const { refugee_id } = req.params;
    const {
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      country_of_origin,
      date_of_arrival_to_us,
      date_of_joining_oasis,
      gender,
      email,
      family_id
    } = req.body;

    await refugeeService.update(refugee_id, {
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      country_of_origin,
      date_of_arrival_to_us,
      date_of_joining_oasis,
      gender,
      email,
      family_id
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating refugee', error);
    res.status(500).json({ error: 'Error updating refugee' });
  }
}
module.exports = {
    getAll,
    getOne,
    create,
    update,
};
