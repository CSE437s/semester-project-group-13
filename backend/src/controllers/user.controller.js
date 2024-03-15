const userService = require('../services/user.service');

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
    const result = await userService.create({
      username,
      password,
      email,
      first_name,
      last_name,
    });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating user', error);
    res.status(500).json({ error: 'Error creating user' });
  }
}

async function update(req, res) {
  try {
    const { user_id } = req.params;
    const { username, password, email, first_name, last_name } = req.body;

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
    console.error('Error Updating User', error);
    res.status(500).json({ error: 'Error updating user' });
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
};
