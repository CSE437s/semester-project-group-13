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

  async function create({
    refugee_family_id,
    host_family_id,
    match_date,
    donator_id,
    neighbor_id
  }) {
    try {
      const query =
        'INSERT INTO good_neighbors (refugee_family_id, host_family_id, match_date, donator_id, neighbor_id) VALUES (?, ?, ?, ?, ?)';
  
      const results = await db.query(query, [
        refugee_family_id,
        host_family_id,
        match_date,
        donator_id,
        neighbor_id
      ]);
  
      const neighbor_ID = results.insertId;
      console.log('Good Neighbor created with ID:', neighbor_ID);
      return { success: true, neighbor_ID };
    } catch (error) {
      console.error('Error Creating Good Neighbor', error);
      throw error;
    }
  }

module.exports = {
    getAll,
    getOne,
    create,
};
