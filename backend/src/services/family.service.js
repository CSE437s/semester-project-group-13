const db = require('./db.service')

async function getAll () {
  const rows = await db.query('SELECT * FROM families')
  return {
    data: rows
  }
}

async function getOne (family_id) {
  try {
    const sql = 'SELECT * FROM families WHERE family_id = ?'
    console.log('Executing query:', sql, family_id)

    const rows = await db.query(sql, [family_id])
    return { data: rows[0] }
  } catch (error) {
    console.error('Error while getting one family', error)
    throw error
  }
}

async function create ({
  user_id,
  IsRefugeeFamily,
  IsOpenToHaveGoodNeighbor,
  IsGoodNeighbor,
  DesiresToBeGoodNeighbor,
  Languages,
  is_deleted,
  FamilyName,
  LatestDateAtOasis,
  DateCreated,
  ArrivalDate,
  CountryOfOrigin,
  EnteredBy,
  Scheduled,
  address,
  zip_code,
  city
}) {
  try {
    const query =
        'INSERT INTO families (head_of_household, last_name, address, city, zip, is_refugee, is_good_neighbor, user_id, is_deleted, family_name, latest_date_at_oasis, date_created, arrival_date, country_of_origin, entered_by, scheduled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

    const results = await db.query(query, [
      user_id,
      IsRefugeeFamily,
      IsOpenToHaveGoodNeighbor,
      IsGoodNeighbor,
      DesiresToBeGoodNeighbor,
      Languages,
      is_deleted,
      FamilyName,
      LatestDateAtOasis,
      DateCreated,
      ArrivalDate,
      CountryOfOrigin,
      EnteredBy,
      Scheduled,
      address,
      zip_code,
      city
    ])

    const family_id = results.insertId
    console.log('Family created with ID:', family_id)
    return { success: true, family_id }
  } catch (error) {
    console.error('Error Creating Family', error)
    throw error
  }
}

async function update ({
  user_id,
  IsRefugeeFamily,
  IsOpenToHaveGoodNeighbor,
  IsGoodNeighbor,
  DesiresToBeGoodNeighbor,
  Languages,
  is_deleted,
  FamilyName,
  LatestDateAtOasis,
  DateCreated,
  ArrivalDate,
  CountryOfOrigin,
  EnteredBy,
  Scheduled,
  address,
  zip_code,
  city,
  family_id
}) {
  try {
    const query = `
      UPDATE families 
      SET user_id = ?, IsRefugeeFamily = ?, IsOpenToHaveGoodNeighbor = ?, IsGoodNeighbor = ?, DesiresToBeGoodNeighbor = ?, Languages = ?, is_deleted = ?, FamilyName = ?, LatestDateAtOasis = ?, DateCreated = ?, ArrivalDate = ?, CountryOfOrigin = ?, EnteredBy = ?, Scheduled = ?, address = ?, zip_code = ?, city = ?
      WHERE family_id = ?
    `

    const results = await db.query(query, [
      user_id,
      IsRefugeeFamily,
      IsOpenToHaveGoodNeighbor,
      IsGoodNeighbor,
      DesiresToBeGoodNeighbor,
      Languages,
      is_deleted,
      FamilyName,
      LatestDateAtOasis,
      DateCreated,
      ArrivalDate,
      CountryOfOrigin,
      EnteredBy,
      Scheduled,
      address,
      zip_code,
      city,
      family_id
    ])

    console.log('Family updated with ID:', family_id)
    return { success: true, family_id }
  } catch (error) {
    console.error('Error updating Family', error)
    throw error
  }
}

async function deleteOne (family_id, is_deleted) {
  try {
    const query = `
      UPDATE families 
      SET is_deleted = ?
      WHERE family_id = ?
    `

    const results = await db.query(query, [
      is_deleted,
      family_id
    ])

    console.log('Family deleted with ID:', family_id)
    return { success: true, family_id }
  } catch (error) {
    console.error('Error deleting Family', error)
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
