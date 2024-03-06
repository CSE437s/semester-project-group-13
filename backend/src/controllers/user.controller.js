const userService = require('../services/user.service');

async function getAllUsers(req, res, next) {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error while getting all users', err.message);
    next(err);
  }
}

async function getOneUser(req, res, next) {
  try {
    const { user_id } = req.params;
    const user = await userService.getOne(user_id);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error while getting one user', err.message);
    next(err);
  }
}

async function createUser(req, res) {
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

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
};
