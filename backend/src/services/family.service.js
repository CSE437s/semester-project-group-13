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
    is_refugee,
    is_good_neighbor,
    user_id,
  }) {
    try {
      const query =
        'INSERT INTO families (head_of_household, last_name, address, city, zip, is_refugee, is_good_neighbor, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
      const results = await db.query(query, [
        head_of_household,
        last_name,
        address,
        city,
        zip,
        is_refugee,
        is_good_neighbor,
        user_id,
      ]);
  
      const family_id = results.insertId;
      console.log('Family created with ID:', family_id);
      return { success: true, family_id };
    } catch (error) {
      console.error('Error Creating Family', error);
      throw error;
    }
  }

  async function update({
    family_id,
    head_of_household,
    last_name,
    address,
    city,
    zip,
    is_refugee,
    is_good_neighbor,
    user_id,
  }) {
    try {
      const query = `
        UPDATE families 
        SET head_of_household = ?, last_name = ?, address = ?, city = ?, zip = ?, is_refugee = ?, is_good_neighbor = ?, user_id = ?
        WHERE family_id = ?
      `;
  
      const results = await db.query(query, [
        head_of_household,
        last_name,
        address,
        city,
        zip,
        is_refugee,
        is_good_neighbor,
        user_id,
        family_id
      ]);
  
      console.log('Family updated with ID:', family_id);
      return { success: true, family_id };
    } catch (error) {
      console.error('Error updating Family', error);
      throw error;
    }
  }
  
  async function deleteOne(family_id) {
    try {
      const query = 'DELETE FROM families WHERE family_id = ?';
      const result = await db.query(query, [family_id]);
      console.log('Family deleted with ID:', family_id);
      return { success: true };
    } catch (error) {
      console.error('Error deleting Family', error);
      throw error;
    }
  }

  async function updateUserId(user_idToChange, family_id) {
    try {
      const query = 'UPDATE families SET user_id = ? WHERE user_id = ?';
      await db.query(query, [family_id, user_idToChange]);
      console.log('User ID updated in families');
    } catch (error) {
      console.error('Error updating user ID in families', error);
      throw error;
    }
  }
    
  async function updateHeadOfFamily(familyIdToChange, new_value) {
    try {
      const query = 'UPDATE families SET head_of_household = ? WHERE head_of_household = ?';
      await db.query(query, [new_value, familyIdToChange]);
      console.log('Head ID updated in families');
    } catch (error) {
      console.error('Error updating Head ID in donations', error);
      throw error;
    }
  }

  async function getAllRefugeesInFamily(req, res) {
    try {
      const { family_id } = req.params;
      const refugees = await refugeeService.getAllByFamilyId(family_id);
      res.json(refugees);
    } catch (error) {
      console.error('Error getting refugees in family', error);
      res.status(500).json({ error: 'Error getting refugees in family' });
    }
  }
  

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    updateUserId,
    updateHeadOfFamily,
    getAllRefugeesInFamily,
};
