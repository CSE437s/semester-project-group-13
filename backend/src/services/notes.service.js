const db = require('./db.service')

async function getAll () {
  try {
    const rows = await db.query('SELECT * FROM notes')
    return {
      data: rows
    }
  } catch (error) {
    console.error('Error while getting all notes', error)
    throw error
  }
}

async function getOne (note_id) {
  try {
    const sql = 'SELECT * FROM notes WHERE note_id = ?'
    console.log('Executing query:', sql, note_id)

    const rows = await db.query(sql, [note_id])
    return { data: rows[0] }
  } catch (error) {
    console.error('Error while getting one note', error)
    throw error
  }
}

async function create ({ description, user_id, date, refugee_id, donator_id, family_id, is_deleted, type }) {
  try {
    const query = `
      INSERT INTO notes (description, user_id, date, refugee_id, donator_id, family_id, is_deleted, type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `

    const results = await db.query(query, [
      description,
      user_id,
      date,
      refugee_id,
      donator_id,
      family_id,
      is_deleted,
      type
    ])

    const note_id = results.insertId
    console.log('Note created with ID:', note_id)
    return { success: true, note_id }
  } catch (error) {
    console.error('Error Creating Note', error)
    throw error
  }
}

async function update ({ note_id, description, user_id, date, refugee_id, donator_id, family_id, is_deleted, type }) {
  try {
    const query = `
      UPDATE notes 
      SET description = ?, user_id = ?, date = ?, refugee_id = ?, donator_id = ?, family_id = ?, is_deleted = ?, type = ?
      WHERE note_id = ?
    `

    const results = await db.query(query, [
      description,
      user_id,
      date,
      refugee_id,
      donator_id,
      family_id,
      is_deleted,
      type,
      note_id
    ])

    console.log('Note updated with ID:', note_id)
    return { success: true, note_id }
  } catch (error) {
    console.error('Error updating Note', error)
    throw error
  }
}

async function deleteOne (note_id, is_deleted) {
  try {
    const query = `
      UPDATE notes 
      SET is_deleted = ?
      WHERE note_id = ?
    `

    const results = await db.query(query, [
      is_deleted,
      note_id
    ])

    console.log('note deleted with ID:', note_id)
    return { success: true, note_id }
  } catch (error) {
    console.error('Error deleting note', note_id)
    throw error
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne
}
