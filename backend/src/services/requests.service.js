const db = require('./db.service');

async function getAll() {
  try {
    const rows = await db.query('SELECT * FROM requests');
    return {
      data: rows,
    };
  } catch (error) {
    console.error('Error while getting all requests', error);
    throw error;
  }
}

async function getOne(request_id) {
  try {
    const sql = 'SELECT * FROM requests WHERE request_id = ?';
    console.log('Executing query:', sql, request_id);

    const rows = await db.query(sql, [request_id]);
    return { data: rows[0] };
  } catch (error) {
    console.error('Error while getting one request', error);
    throw error;
  }
}
async function create({
  family_id,
  date,
  item,
  amount,
  completed,
  is_deleted,
  user_id,
}) {
  try {
    const query = `
      INSERT INTO requests (family_id, date, item, amount, completed, is_deleted, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const results = await db.query(query, [
      family_id,
      date,
      item,
      amount,
      completed,
      is_deleted,
      user_id,
    ]);

    const request_id = results.insertId;
    console.log('Request created with ID:', request_id);
    return { success: true, request_id };
  } catch (error) {
    console.error('Error Creating Request', error);
    throw error;
  }
}


async function update({
  request_id,
  family_id,
  date,
  item,
  amount,
  completed,
  is_deleted,
  user_id,
}) {
  try {
    const query = `
      UPDATE requests 
      SET family_id = ?, date = ?, item = ?, amount = ?, completed = ?, is_deleted = ?, user_id = ?
      WHERE request_id = ?
    `;

    const results = await db.query(query, [
      family_id,
      date,
      item,
      amount,
      completed,
      is_deleted,
      user_id,
      request_id,
    ]);

    console.log('Request updated with ID:', request_id);
    return { success: true, request_id };
  } catch (error) {
    console.error('Error updating Request', error);
    throw error;
  }
}


async function deleteOne(request_id) {
  try {
    const query = 'DELETE FROM requests WHERE request_id = ?';
    const result = await db.query(query, [request_id]);
    console.log('Request deleted with ID:', request_id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting Request', error);
    throw error;
  }
}

async function deleteOne(request_id, is_deleted) {
  try {
    const query = `
      UPDATE requests 
      SET is_deleted = ?
      WHERE request_id = ?
    `;

    const results = await db.query(query, [
      is_deleted,
      request_id
    ]);

    console.log('Request deleted with ID:', request_id);
    return { success: true, request_id };
  } catch (error) {
    console.error('Error deleting Request', error);
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
