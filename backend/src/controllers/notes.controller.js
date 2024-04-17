const noteService = require('../services/notes.service');

async function getAll(req, res, next) {
  try {
    res.json(await noteService.getAll());
  } catch (err) {
    console.error('Error while getting all notes', err.message);
    next(err);
  }
}


async function getSome(req, res, next) {
  try {
      const { startIndex, limit } = req.query;
      res.json(await noteService.getSome(startIndex, limit));
  } catch (err) {
      console.error('Error while getting some notes', err.message);
      next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const { note_id } = req.params;
    res.json(await noteService.getOne(note_id));
  } catch (err) {
    console.error('Error while getting one note', err.message);
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
      INSERT INTO notes (description, user_id, date, refugee_id, donator_id, family_id, is_deleted, type)
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

    const note_id = results.insertId;
    console.log('Note created with ID:', note_id);
    return { success: true, note_id };
  } catch (error) {
    console.error('Error creating note', error);
    throw error;
  }
}


async function update(req, res) {
  try {
    const { note_id } = req.params;
    const { description, user_id, date, refugee_id, donator_id, family_id, is_deleted, type } = req.body;

    const result = await noteService.update({
      note_id,
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
    console.error('Error updating note', error.message);
    res.status(500).json({ error: 'Error updating note' });
  }
}

async function deleteOne(req, res) {
  try {
    const { note_id } = req.params; 
    const { is_deleted } = req.body;

    const result = await noteService.deleteOne(note_id, is_deleted);

    res.status(200).json(result);
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      console.error('Error Deleting Note: This note is referenced by other records.');
      return res.status(400).json({ error: 'This note is referenced by other records and cannot be deleted.' });
    }

    console.error('Error Deleting Note', error);
    res.status(500).json({ error: 'Error Deleting Note' });
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
