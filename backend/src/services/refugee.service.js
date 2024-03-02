const db = require('./db.service');

async function getAll() {
    const rows = await db.query('SELECT * FROM refugees');
    return {
        data: rows,
    };
}

async function getOne(refugee_id) {
    try {
      const sql = 'SELECT * FROM refugees WHERE refugee_id = ?';
      console.log('Executing query:', sql, refugee_id);
  
      const rows = await db.query(sql, [refugee_id]);
      return { data: rows[0] };
    } catch (error) {
      console.error('Error while getting one refugee', error);
      throw error;
    }
  }

module.exports = {
    getAll,
    getOne,
};
