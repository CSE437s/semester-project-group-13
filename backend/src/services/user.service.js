const db = require('./db.service');

async function getAll() {
    const rows = await db.query('SELECT * FROM users');
    return {
        data: rows,
    };
}

async function getOne(user_id) {
    try {
      const sql = 'SELECT * FROM users WHERE user_id = ?';
      console.log('Executing query:', sql, user_id);
  
      const rows = await db.query(sql, [user_id]);
      return { data: rows[0] };
    } catch (error) {
      console.error('Error while getting one user', error);
      throw error;
    }
  }

  async function create({
    username,
    password,
    email,
    first_name,
    last_name
  }) {
    try {
      const query =
      'INSERT INTO users (username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)';
  
      const results = await db.query(query, [
        username,
        password,
        email,
        first_name,
        last_name
      ]);
  
      const user_id = results.insertId;
      console.log('User created with ID:', user_id);
      return { success: true, user_id };
    } catch (error) {
      console.error('Error Creating User', error);
      throw error;
    }
  }

module.exports = {
    getAll,
    getOne,
    create,
};
