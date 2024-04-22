const prototypeservice = require('../services/prototypes.service');

async function getAll(req, res, next) {
  try {
    res.json(await prototypeservice.getAll());
  } catch (err) {
    console.error('Error while getting all prototypes', err.message);
    next(err);
  }
}


async function getSome(req, res, next) {
  try {
      const { startIndex, limit } = req.query;
      res.json(await prototypeservice.getSome({ startIndex, limit })); 
  } catch (err) {
      console.error('Error while getting some prototypes', err.message);
      next(err);
  }
}


async function getOne(req, res, next) {
  try {
    const { id } = req.params;
    res.json(await prototypeservice.getOne(id));
  } catch (err) {
    console.error('Error while getting one prototype', err.message);
    next(err);
  }
}

async function create({
  description,
  user_id,
  date,
  refugee_id,
  donator_id,
  family_id,
  is_deleted,
  type,
}) {
  try {
    const query = `
      INSERT INTO prototypes (description, user_id, date, refugee_id, donator_id, family_id, is_deleted, type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const results = await db.query(query, [
      description,
      user_id,
      date,
      refugee_id,
      donator_id,
      family_id,
      is_deleted,
      type,
    ]);

    const id = results.insertId;
    console.log('prototype created with ID:', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error creating prototype', error);
    throw error;
  }
}


async function update(req, res) {
  try {
    const { id } = req.params;
    const { description, user_id, date, refugee_id, donator_id, family_id, is_deleted, type } = req.body;

    const result = await prototypeservice.update({
      id,
      description,
      user_id,
      date,
      refugee_id,
      donator_id,
      family_id,
      is_deleted,
      type,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating prototype', error.message);
    res.status(500).json({ error: 'Error updating prototype' });
  }
}

async function deleteOne(req, res) {
  try {
    const { id } = req.params; 
    const { is_deleted } = req.body;

    const result = await prototypeservice.deleteOne(id, is_deleted);

    res.status(200).json(result);
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      console.error('Error Deleting prototype: This prototype is referenced by other records.');
      return res.status(400).json({ error: 'This prototype is referenced by other records and cannot be deleted.' });
    }

    console.error('Error Deleting prototype', error);
    res.status(500).json({ error: 'Error Deleting prototype' });
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
