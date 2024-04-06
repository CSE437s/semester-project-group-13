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
  amount,
  completed,
  date,
  family_id,
  user_id,
}) {
  try {
    const query = `
      INSERT INTO donations (item, amount, completed, date, family_id, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const results = await db.query(query, [
      item,
      amount,
      completed,
      date,
      family_id,
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

async function update({ donation_id, item, amount, completed}) {
  try {
    const query = `
      UPDATE donations 
      SET item = ?, amount = ?, completed = ?
      WHERE donation_id = ?
    `;

    const results = await db.query(query, [
      item,
      amount,
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
    const query = 'UPDATE donations SET is_deleted WHERE donation_id = ?';
    const result = await db.query(query, [is_deleted ,donation_id]);
    console.log('Donation deleted with ID:', donation_id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting Donation', error);
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
