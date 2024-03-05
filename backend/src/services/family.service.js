const db = require('./db.service');

async function getAll() {
    const rows = await db.query('SELECT * FROM families');
    return {
        data: rows,
    };
}

async function getOne(family_id) {
    try {
      const sql = 'SELECT * FROM families WHERE family_id = ?';
      console.log('Executing query:', sql, family_id);
  
      const rows = await db.query(sql, [family_id]);
      return { data: rows[0] };
    } catch (error) {
      console.error('Error while getting one family', error);
      throw error;
    }
  }

module.exports = {
    getAll,
    getOne,
};
