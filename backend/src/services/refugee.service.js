const db = require('./db.service');

async function getAll() {
    const rows = await db.query('SELECT * FROM refugees');
    return {
        data: rows,
    };
}


//this should be getting from the refugee/god neighbor/donator tables
async function getAllInFamily(family_id) {
  try {
    const sql = 'SELECT * FROM families WHERE family_id = ?';
    const rows = await db.query(sql, [family_id]);
    return {
      data: rows,
    };
  } catch (error) {
    console.error('Error while getting all families by family ID', error);
    throw error;
  }
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

  async function create({
    first_name,
    last_name,
    family_id,
    is_head_of_house,
    birthday,
    gender,
    relation_to_head,
    phone,
    is_deleted,
  }) {
    try {
      const query =
        'INSERT INTO refugees (first_name, last_name, family_id, is_head_of_house, birthday, gender, relation_to_head, phone, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
      const results = await db.query(query, [
        first_name,
        last_name,
        family_id,
        is_head_of_house,
        birthday,
        gender,
        relation_to_head,
        phone,
        is_deleted
      ]);
  
      const refugee_id = results.insertId;
      console.log('Refugee created with ID:', refugee_id);
      return { success: true, refugee_id };
    } catch (error) {
      console.error('Error Creating Refugee', error);
      throw error;
    }
  }
  

  async function update(refugee_id, {
    first_name,
    last_name,
    family_id,
    is_head_of_house,
    birthday,
    gender,
    relation_to_head,
    phone,
    is_deleted
  }) {
    try {
      const query =
        `UPDATE refugees 
         SET 
           first_name = ?, 
           last_name = ?, 
           family_id = ?, 
           is_head_of_house = ?, 
           birthday = ?, 
           gender = ?, 
           relation_to_head = ?, 
           phone = ?, 
           is_deleted = ? 
         WHERE refugee_id = ?`;
  
      const results = await db.query(query, [
        first_name,
        last_name,
        family_id,
        is_head_of_house,
        birthday,
        gender,
        relation_to_head,
        phone,
        is_deleted,
        refugee_id
      ]);
  
      console.log(`Refugee with ID ${refugee_id} updated successfully`);
      return { success: true };
    } catch (error) {
      console.error('Error updating refugee', error);
      throw error;
    }
  }
  

async function deleteOne(refugee_id, {
  is_deleted
}) {
  try {
    const query =
      `UPDATE refugees 
       SET is_deleted = ? 
       WHERE refugee_id = ?`;

    const results = await db.query(query, [
      is_deleted,
      refugee_id
    ]);

    console.log(`Refugee with ID ${refugee_id} deleting successfully`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting refugee', error);
    throw error;
  }
}



module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    getAllInFamily,
};
