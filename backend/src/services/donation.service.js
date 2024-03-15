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
  user_id,
}) {
  try {
    const query = `
      INSERT INTO donations (item, quantity, completed, giving_family, giving_volunteer, receiving_family, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const results = await db.query(query, [
      item,
      quantity,
      completed,
      giving_family,
      giving_volunteer,
      receiving_family,
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

module.exports = {
  getAll,
  getOne,
  create,
};
