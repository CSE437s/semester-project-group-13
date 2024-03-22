const db = require('./db.service');

async function getAll() {
    const rows = await db.query('SELECT * FROM volunteers');
    return {
        data: rows,
    };
}

async function getOne(volunteer_id) {
    try {
      const sql = 'SELECT * FROM volunteers WHERE volunteer_id = ?';
      console.log('Executing query:', sql, volunteer_id);
  
      const rows = await db.query(sql, [volunteer_id]);
      return { data: rows[0] };
    } catch (error) {
      console.error('Error while getting one volunteer', error);
      throw error;
    }
  }

  
async function create({
  first_name,
  last_name,
  date_of_birth,
  phone_number,
  user_id,
  family_id
}) {
  try {
    const query =
    'INSERT INTO volunteers (first_name, last_name, date_of_birth, phone_number, user_id, family_id) VALUES (?, ?, ?, ?, ?, ?)';

    const results = await db.query(query, [
        first_name,
        last_name,
        date_of_birth,
        phone_number,
        user_id,
        family_id
    ]);

    const volunteer_id = results.insertId;
    console.log('volunteer created with ID:', volunteer_id);
    return { success: true, volunteer_id };
  } catch (error) {
    console.error('Error Creating volunteer', error);
    throw error;
  }
}
async function update(volunteer_id, { first_name, last_name, date_of_birth, phone_number, user_id, family_id }) {
  try {
    const query = `
      UPDATE volunteers 
      SET first_name = ?, last_name = ?, date_of_birth = ?, phone_number = ?, user_id = ?, family_id = ?
      WHERE volunteer_id = ?
    `;

    const results = await db.query(query, [
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      user_id,
      family_id,
      volunteer_id
    ]);

    console.log('Volunteer updated with ID:', volunteer_id);
    return { success: true, volunteer_id };
  } catch (error) {
    console.error('Error updating Volunteer', error);
    throw error;
  }
}


async function deleteOne(volunteer_id) {
  try {
    const query = 'DELETE FROM volunteers WHERE volunteer_id = ?';
    await db.query(query, [volunteer_id]);
    console.log(`Volunteer with ID ${volunteer_id} deleted successfully`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting volunteer', error);
    throw error;
  }
}


async function updateUserId(user_idToChange, volunteer_id) {
  try {
    const query = 'UPDATE volunteers SET user_id = ? WHERE user_id = ?';
    await db.query(query, [volunteer_id, user_idToChange]);
    console.log('User ID updated in volunteers');
  } catch (error) {
    console.error('Error updating user ID in volunteers', error);
    throw error;
  }
}


  
async function updateFamilyId(familyIdToChange, new_value) {
  try {
    const query = 'UPDATE volunteers SET family_id = ? WHERE family_id = ?';
    await db.query(query, [new_value, familyIdToChange]);
    console.log('Family ID updated in volunteers');
  } catch (error) {
    console.error('Error updating Family ID in volunteers', error);
    throw error;
  }
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    updateUserId,
    updateFamilyId,
};
