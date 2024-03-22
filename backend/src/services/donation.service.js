const db = require('./db.service');

async function getAll() {
  try {
    const rows = await db.query('SELECT * FROM donations');
    return {
      data: rows,
    };
  } catch (error) {
    console.error('Error while getting all donations', error);
    throw error;
  }
}

async function getOne(donation_id) {
  try {
    const sql = 'SELECT * FROM donations WHERE donation_id = ?';
    console.log('Executing query:', sql, donation_id);

    const rows = await db.query(sql, [donation_id]);
    return { data: rows[0] };
  } catch (error) {
    console.error('Error while getting one donation', error);
    throw error;
  }
}

async function create({
  item,
  quantity,
  completed,
  giving_family,
  giving_volunteer,
  receiving_family,
  receiving_refugee,
  user_id,
}) {
  try {
    const query = `
      INSERT INTO donations (item, quantity, completed, giving_family, giving_volunteer, receiving_family, receiving_refugee, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const results = await db.query(query, [
      item,
      quantity,
      completed,
      giving_family,
      giving_volunteer,
      receiving_family,
      receiving_refugee,
      user_id,
    ]);

    const donation_id = results.insertId;
    console.log('Donation created with ID:', donation_id);
    return { success: true, donation_id };
  } catch (error) {
    console.error('Error Creating Donation', error);
    throw error;
  }
}

async function update({ donation_id, item, quantity, completed}) {
  try {
    const query = `
      UPDATE donations 
      SET item = ?, quantity = ?, completed = ?
      WHERE donation_id = ?
    `;

    const results = await db.query(query, [
      item,
      quantity,
      completed,
      donation_id
    ]);

    console.log('Donation updated with ID:', donation_id);
    return { success: true, donation_id };
  } catch (error) {
    console.error('Error updating Donation', error);
    throw error;
  }
}

async function deleteOne(donation_id) {
  try {
    const query = 'DELETE FROM donations WHERE donation_id = ?';
    const result = await db.query(query, [donation_id]);
    console.log('Donation deleted with ID:', donation_id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting Donation', error);
    throw error;
  }
}

async function updateGivingVolunteer(volunteer_id, new_value) {
  try {
    const query = 'UPDATE donations SET giving_volunteer = ? WHERE giving_volunteer = ?';
    await db.query(query, [new_value, volunteer_id]);
    console.log('Giving volunteer updated in donations');
  } catch (error) {
    console.error('Error updating giving volunteer in donations', error);
    throw error;
  }
}

async function updateUserId(user_idToChange, new_value) {
  try {
    const query = 'UPDATE donations SET giving_family = ? WHERE giving_family = ?';
    await db.query(query, [new_value, user_idToChange]);
    console.log('User ID updated in donations');
  } catch (error) {
    console.error('Error updating user ID in donations', error);
    throw error;
  }
}

async function updateRefugeeId(refugeeIdToChange, new_value) {
  try {
    const query = 'UPDATE donations SET receiving_refugee = ? WHERE receiving_refugee = ?';
    await db.query(query, [new_value, refugeeIdToChange]);
    console.log('Refugee ID updated in donations');
  } catch (error) {
    console.error('Error updating Refugee ID in donations', error);
    throw error;
  }
}

async function updateGivingFamilyId(familyIdToChange, new_value) {
  try {
    const query = 'UPDATE donations SET giving_family = ? WHERE giving_family = ?';
    await db.query(query, [new_value, familyIdToChange]);
    console.log('Family ID updated in donations');
  } catch (error) {
    console.error('Error updating Family ID in donations', error);
    throw error;
  }
}

async function updateRecievingFamilyId(familyIdToChange, new_value) {
  try {
    const query = 'UPDATE donations SET receiving_family = ? WHERE receiving_family = ?';
    await db.query(query, [new_value, familyIdToChange]);
    console.log('Family ID updated in donations');
  } catch (error) {
    console.error('Error updating Family ID in donations', error);
    throw error;
  }
}


module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  updateGivingVolunteer,
  updateUserId,
  updateRefugeeId,
  updateGivingFamilyId,
  updateRecievingFamilyId,
};
