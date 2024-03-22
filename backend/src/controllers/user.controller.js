const userService = require('../services/user.service');
const donationService = require('../services/donation.service');
const familyService = require('../services/family.service');
const refugeeService = require('../services/refugee.service');
const volunteerService = require('../services/volunteer.service');
const noteService = require('../services/notes.service');
const requestService = require('../services/requests.service');


async function getAll(req, res, next) {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error while getting all users', err.message);
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const { user_id } = req.params;
    const user = await userService.getOne(user_id);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error while getting one user', err.message);
    next(err);
  }
}

async function create(req, res) {
  try {
    const { username, password, email, first_name, last_name } = req.body;
    if (!username || !password || !email || !first_name || !last_name) {
      throw new Error('Incomplete user data. Please provide all required fields.');
    }
    const result = await userService.create({
      username,
      password,
      email,
      first_name,
      last_name,
    });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating user', error.message);
    res.status(500).json({ error: 'Error creating user' });
  }
}

async function update(req, res) {
  try {
    const { user_id } = req.params;
    const { username, password, email, first_name, last_name } = req.body;

    if (!username && !password && !email && !first_name && !last_name) {
      throw new Error('No data provided for update. Please provide at least one field to update.');
    }

    const result = await userService.update({
      user_id,
      username,
      password,
      email,
      first_name,
      last_name,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating user', error.message);
    res.status(500).json({ error: 'Error updating user' });
  }
}

async function deleteOne(req, res) {
  try {
    const { user_id } = req.params;

    await Promise.all([
      donationService.updateUserId(user_id, 1),
      familyService.updateUserId(user_id, 1),
      refugeeService.updateUserId(user_id, 1),
      volunteerService.updateUserId(user_id, 1),
      requestService.updateUserId(user_id, 1),
      noteService.updateUserId(user_id, 1)

    ]);

    await userService.deleteOne(user_id);


    res.status(200).json({ success: true });
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      console.error('Error deleting user: This user is referenced by other records.');
      return res.status(400).json({ error: 'This user is referenced by other records and cannot be deleted.' });
    }

    console.error('Error deleting user', error.message);
    res.status(500).json({ error: 'Error deleting user' });
  }
}


module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
