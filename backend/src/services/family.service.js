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

  async function create({
    head_of_household,
    last_name,
    address,
    city,
    zip,
    family_members = '',
    good_neighbor = '',
  }) {
    try {
      const query =
        'INSERT INTO families (head_of_household, last_name, address, city, zip, family_members, good_neighbor) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
      const results = await db.query(query, [
        head_of_household,
        last_name,
        address,
        city,
        zip,
        family_members,
        good_neighbor,
      ]);
  
      const family_id = results.insertId;
      console.log('Family created with ID:', family_id);
      return { result: 'Success', family_id };
    } catch (error) {
      console.error('Error Creating Family', error);
      throw error;
    }
  }

module.exports = {
    getAll,
    getOne,
    create,
};
