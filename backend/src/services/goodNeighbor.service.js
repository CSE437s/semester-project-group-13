const db = require('./db.service');

async function getAll() {
    const rows = await db.query('SELECT * FROM good_neighbors');
    return {
        data: rows,
    };
}

async function getOne(neighbor_id) {
    try {
      const sql = 'SELECT * FROM good_neighbors WHERE neighbor_id = ?';
      console.log('Executing query:', sql, neighbor_id);
  
      const rows = await db.query(sql, [neighbor_id]);
      return { data: rows[0] };
    } catch (error) {
      console.error('Error while getting one good neighbor', error);
      throw error;
    }
  }

module.exports = {
    getAll,
    getOne,
};
