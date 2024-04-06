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
    Refugee_Family_ID,
    FamilyID,
    Birthday,
    Email,
    FirstName,
    LastName,
    Gender,
    PhoneNumber,
    Relation,
    is_head_of_house,
    is_deleted,
  }) {
    try {
      const query =
        'INSERT INTO good_neighbors (Refugee_Family_ID, FamilyID, Birthday, Email, FirstName, LastName, Gender, PhoneNumber, Relation, is_head_of_house, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
      const results = await db.query(query, [
        Refugee_Family_ID,
        FamilyID,
        Birthday,
        Email,
        FirstName,
        LastName,
        Gender,
        PhoneNumber,
        Relation,
        is_head_of_house,
        is_deleted,
      ]);
  
      const neighbor_ID = results.insertId;
      console.log('Good Neighbor created with ID:', neighbor_ID);
      return { success: true, neighbor_ID };
    } catch (error) {
      console.error('Error Creating Good Neighbor', error);
      throw error;
    }
  }
  
  async function update({
    neighbor_id,
    Refugee_Family_ID,
    FamilyID,
    Birthday,
    Email,
    FirstName,
    LastName,
    Gender,
    PhoneNumber,
    Relation,
    is_head_of_house,
    is_deleted,
  }) {
    try {
      const query = `
        UPDATE good_neighbors 
        SET Refugee_Family_ID = ?, FamilyID = ?, Birthday = ?, Email = ?, FirstName = ?, LastName = ?, Gender = ?, PhoneNumber = ?, Relation = ?, is_head_of_house = ?, is_deleted = ?
        WHERE neighbor_id = ?
      `;
  
      const results = await db.query(query, [
        Refugee_Family_ID,
        FamilyID,
        Birthday,
        Email,
        FirstName,
        LastName,
        Gender,
        PhoneNumber,
        Relation,
        is_head_of_house,
        is_deleted,
        neighbor_id,
      ]);
  
      console.log('Neighbor updated with ID:', neighbor_id);
      return { success: true, neighbor_id };
    } catch (error) {
      console.error('Error updating Neighbor', error);
      throw error;
    }
  }
  
  async function deleteOne(neighbor_id) {
    try {
      const query = 'DELETE FROM good_neighbors WHERE neighbor_id = ?';
      const result = await db.query(query, [neighbor_id]);
      console.log('Neighbor deleted with ID:', neighbor_id);
      return { success: true };
    } catch (error) {
      console.error('Error deleting Neighbor', error);
      throw error;
    }
  }

async function deleteOne(neighbor_id, is_deleted) {
  try {
    const query = `
      UPDATE good_neighbors 
      SET is_deleted = ?
      WHERE neighbor_id = ?
    `;

    const results = await db.query(query, [
      is_deleted,
      neighbor_id
    ]);

    console.log('neighbor deleted with ID:', neighbor_id);
    return { success: true, neighbor_id };
  } catch (error) {
    console.error('Error deleting Neighbor', error);
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
