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


  async function getSome({ startIndex, limit }) { 
    try {
        const query = 'SELECT * FROM users LIMIT ?, ?';
        const rows = await db.query(query, [startIndex, limit]);
        
        return {
            data: rows,
        };
    } catch (error) {
        console.error('Error while getting some user', error.message);
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

  async function update({ user_id, username, password, email, first_name, last_name }) {
    try {
      const query = `
        UPDATE users 
        SET username = ?, password = ?, email = ?, first_name = ?, last_name = ?
        WHERE user_id = ?
      `;
  
      await db.query(query, [username, password, email, first_name, last_name, user_id]);
  
      console.log('User updated with ID:', user_id);
      return { success: true, user_id };
    } catch (error) {
      console.error('Error updating User', error);
      throw error;
    }
  }

  async function deleteOne(user_id) {
    try {
      const query = 'DELETE FROM users WHERE user_id = ?';
      await db.query(query, [user_id]);
      console.log(`User with ID ${user_id} deleted successfully`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting user', error);
      throw error;
    }
  }

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    getSome,
};
