const db = require('./db.service')

async function getAll () {
  try {
    const rows = await db.query('SELECT * FROM prototypes')
    return {
      data: rows
    }
  } catch (error) {
    console.error('Error while getting all prototypes', error)
    throw error
  }
}

async function getOne (id) {
  try {
    const sql = 'SELECT * FROM prototypes WHERE id = ?'
    console.log('Executing query:', sql, id)

    const rows = await db.query(sql, [id])
    return { data: rows[0] }
  } catch (error) {
    console.error('Error while getting one Prototype', error)
    throw error
  }
}

async function create ({ description, user_id, date, refugee_id, donator_id, family_id, is_deleted, type }) {
  try {
    const query = `
      INSERT INTO prototypes (description, user_id, date, refugee_id, donator_id, family_id, is_deleted, type)
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

    const id = results.insertId
    console.log('Prototype created with ID:', id)
    return { success: true, id }
  } catch (error) {
    console.error('Error Creating Prototype', error)
    throw error
  }
}

async function update ({ id, description, user_id, date, refugee_id, donator_id, family_id, is_deleted, type }) {
  try {
    const query = `
      UPDATE prototypes 
      SET description = ?, user_id = ?, date = ?, refugee_id = ?, donator_id = ?, family_id = ?, is_deleted = ?, type = ?
      WHERE id = ?
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
      id
    ])

    console.log('Prototype updated with ID:', id)
    return { success: true, id }
  } catch (error) {
    console.error('Error updating Prototype', error)
    throw error
  }
}

async function deleteOne (id, is_deleted) {
  try {
    const query = `
      UPDATE prototypes 
      SET is_deleted = ?
      WHERE id = ?
    `

    const results = await db.query(query, [
      is_deleted,
      id
    ])

    console.log('Prototype deleted with ID:', id)
    return { success: true, id }
  } catch (error) {
    console.error('Error deleting Prototype', id)
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
