const db = require('./db.service');

async function getAll() {
  try {
    const rows = await db.query('SELECT * FROM notes');
    return {
      data: rows,
    };
  } catch (error) {
    console.error('Error while getting all notes', error);
    throw error;
  }
}

async function getOne(note_id) {
  try {
    const sql = 'SELECT * FROM notes WHERE note_id = ?';
    console.log('Executing query:', sql, note_id);

    const rows = await db.query(sql, [note_id]);
    return { data: rows[0] };
  } catch (error) {
    console.error('Error while getting one note', error);
    throw error;
  }
}

async function create({ refugee_id, user_id, date, text, type }) {
  try {
    const query = `
      INSERT INTO notes (refugee_id, user_id, date, text, type)
      VALUES (?, ?, ?, ?, ?)
    `;

    const results = await db.query(query, [
      refugee_id,
      user_id,
      date,
      text,
      type
    ]);

    const note_id = results.insertId;
    console.log('Note created with ID:', note_id);
    return { success: true, note_id };
  } catch (error) {
    console.error('Error Creating Note', error);
    throw error;
  }
}

async function update({ note_id, refugee_id, user_id, date, text, type }) {
  try {
    const query = `
      UPDATE notes 
      SET refugee_id = ?, user_id = ?, date = ?, text = ?, type = ?
      WHERE note_id = ?
    `;

    const results = await db.query(query, [
      refugee_id,
      user_id,
      date,
      text,
      type,
      note_id
    ]);

    console.log('Note updated with ID:', note_id);
    return { success: true, note_id };
  } catch (error) {
    console.error('Error updating Note', error);
    throw error;
  }
}

async function deleteOne(note_id) {
  try {
    const query = 'DELETE FROM notes WHERE note_id = ?';
    const result = await db.query(query, [note_id]);
    console.log('Note deleted with ID:', note_id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting Note', error);
    throw error;
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
