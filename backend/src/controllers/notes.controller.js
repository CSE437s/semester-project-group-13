const noteService = require('../services/notes.service');

async function getAll(req, res, next) {
  try {
    res.json(await noteService.getAll());
  } catch (err) {
    console.error('Error while getting all notes', err.message);
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

async function create(req, res) {
  try {
    const { refugee_id, user_id, date, text, type } = req.body;

    const result = await noteService.create({
      refugee_id,
      user_id,
      date,
      text,
      type
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error creating note', error.message);
    res.status(500).json({ error: 'Error creating note' });
  }
}

async function update(req, res) {
  try {
    const { note_id } = req.params;
    const { refugee_id, user_id, date, text, type } = req.body;

    const result = await noteService.update({
      note_id,
      refugee_id,
      user_id,
      date,
      text,
      type
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
    await noteService.deleteOne(note_id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting note', error.message);
    res.status(500).json({ error: 'Error deleting note' });
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
