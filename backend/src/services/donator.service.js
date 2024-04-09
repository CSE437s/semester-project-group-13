const db = require('./db.service')

async function getAll () {
  const rows = await db.query('SELECT * FROM donators')
  return {
    data: rows
  }
}

async function getOne (donator_id) {
  try {
    const sql = 'SELECT * FROM donators WHERE donator_id = ?'
    console.log('Executing query:', sql, donator_id)

    const rows = await db.query(sql, [donator_id])
    return { data: rows[0] }
  } catch (error) {
    console.error('Error while getting one donator', error)
    throw error
  }
}

async function create ({
  first_name,
  last_name,
  is_head_of_house,
  family_id,
  birthday,
  phone_number,
  user_id,
  city,
  is_deleted,
  relation_to_head,
  address,
  email,
  zip_code
}) {
  try {
    const query = `
        INSERT INTO donators (first_name, last_name, is_head_of_house, family_id, date_of_birth, phone_number, user_id, city, is_deleted, relation_to_head, address, email, zip_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

    const results = await db.query(query, [
      first_name,
      last_name,
      is_head_of_house,
      family_id,
      birthday,
      phone_number,
      user_id,
      city,
      is_deleted,
      relation_to_head,
      address,
      email,
      zip_code
    ])

    const donator_id = results.insertId
    console.log('Donator created with ID:', donator_id)
    return { success: true, donator_id }
  } catch (error) {
    console.error('Error Creating Donator', error)
    throw error
  }
}

async function update (donator_id, {
  first_name,
  last_name,
  is_head_of_house,
  family_id,
  birthday,
  phone_number,
  user_id,
  city,
  is_deleted,
  relation_to_head,
  address,
  email,
  zip_code
}) {
  try {
    const query = `
        UPDATE donators 
        SET first_name = ?, last_name = ?, is_head_of_house = ?, family_id = ?, date_of_birth = ?, phone_number = ?, user_id = ?, city = ?, is_deleted = ?, relation_to_head = ?, address = ?, email = ?, zip_code = ?
        WHERE donator_id = ?
      `

    const results = await db.query(query, [
      first_name,
      last_name,
      is_head_of_house,
      family_id,
      birthday,
      phone_number,
      user_id,
      city,
      is_deleted,
      relation_to_head,
      address,
      email,
      zip_code,
      donator_id
    ])

    console.log('Donator updated with ID:', donator_id)
    return { success: true, donator_id }
  } catch (error) {
    console.error('Error updating donator', error)
    throw error
  }
}

async function deleteOne (donator_id, is_deleted) {
  try {
    const query = `
        UPDATE donators 
        SET is_deleted = ?
        WHERE donator_id = ?
      `

    const results = await db.query(query, [
      is_deleted,
      donator_id
    ])

    console.log('Donator deleted with ID:', donator_id)
    return { success: true, donator_id }
  } catch (error) {
    console.error('Error deleting donator', error)
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
