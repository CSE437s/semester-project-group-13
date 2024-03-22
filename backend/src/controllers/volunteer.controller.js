const volunteerService = require('../services/volunteer.service');
const donationService = require('../services/donation.service');


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

        if (!first_name || !last_name || !date_of_birth || !phone_number || !user_id || !family_id) {
          throw new Error('Missing required fields. Please provide all required data.');
      }

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
        console.error('Error Creating volunteer', error.message);
        res.status(500).json({ error: 'Error creating volunteer' });
    }
}

async function update(req, res) {
    try {
        const { volunteer_id } = req.params;

        const {
            first_name,
            last_name,
            date_of_birth,
            phone_number,
            user_id,
            family_id
        } = req.body;

      if (!first_name && !last_name && !date_of_birth && !phone_number && !user_id && !family_id) {
      throw new Error('No fields provided for update. Please provide at least one field to update.');
      }

    await volunteerService.update(volunteer_id, {
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      user_id,
      family_id
    });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error updating volunteer', error.message);
        res.status(500).json({ error: 'Error updating volunteer' });
    }
}

async function deleteOne(req, res) {
  try {
    const { volunteer_id } = req.params;

    await donationService.updateGivingVolunteer(volunteer_id, 2);

    await volunteerService.deleteOne(volunteer_id);

    res.status(200).json({ success: true });
  } catch (error) {
    // Handle specific error case: foreign key constraint violation
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      console.error('Error deleting volunteer: This volunteer is referenced by other records.');
      return res.status(400).json({ error: 'This volunteer is referenced by other records and cannot be deleted.' });
    }

    // Handle general error cases
    console.error('Error deleting volunteer', error.message);
    res.status(500).json({ error: 'Error deleting volunteer' });
  }
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
};
