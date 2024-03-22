const db = require('./db.service');

async function getAll() {
    const rows = await db.query('SELECT * FROM refugees');
    return {
        data: rows,
    };
}



async function getAllInFamily(family_id) {
  try {
      if (!family_id) {
          throw new Error('Family ID is required');
      }

      // Check if the family exists
      const family = await db.query('SELECT * FROM families WHERE family_id = ?', [family_id]);
      if (family.length === 0) {
          throw new Error('Family not found');
      }

      // Check if the family is a refugee family
      const isRefugeeFamily = family[0].is_refugee === 1;
      if (!isRefugeeFamily) {
          throw new Error('The specified family is not a refugee family');
      }

      // Fetch all refugees in the family
      const sql = 'SELECT * FROM refugees WHERE family_id = ?';
      console.log('Executing query:', sql, family_id);

      const rows = await db.query(sql, [family_id]);
      return {
          data: rows,
      };
  } catch (error) {
      console.error('Error while getting all refugees in a family', error);
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
  date_of_birth,
  phone_number,
  country_of_origin,
  date_of_arrival_to_us,
  date_of_joining_oasis,
  gender,
  email,
  family_id
}) {
  try {
    const query =
      'INSERT INTO refugees (first_name, last_name, date_of_birth, phone_number, country_of_origin, date_of_arrival_to_us, date_of_joining_oasis, gender, email, family_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const results = await db.query(query, [
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      country_of_origin,
      date_of_arrival_to_us,
      date_of_joining_oasis,
      gender,
      email,
      family_id
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
  phone_number,
  gender,
  email,
  family_id
}) {
  try {
    const query =
      `UPDATE refugees 
       SET 
         first_name = ?, 
         last_name = ?, 
         phone_number = ?, 
         gender = ?, 
         email = ?, 
         family_id = ? 
       WHERE refugee_id = ?`;

    const results = await db.query(query, [
      first_name,
      last_name,
      phone_number,
      gender,
      email,
      family_id,
      refugee_id
    ]);

    console.log(`Refugee with ID ${refugee_id} updated successfully`);
    return { success: true };
  } catch (error) {
    console.error('Error updating refugee', error);
    throw error;
  }
}

async function deleteOne(refugee_id) {
  try {
    const query = 'DELETE FROM refugees WHERE refugee_id = ?';
    await db.query(query, [refugee_id]);
    console.log(`Refugee with ID ${refugee_id} deleted successfully`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting refugee', error);
    throw error;
  }
}

async function updateUserId(user_idToChange, refugee_id) {
  try {
    const query = 'UPDATE refugees SET user_id = ? WHERE user_id = ?';
    await db.query(query, [refugee_id, user_idToChange]);
    console.log('User ID updated in refugees');
  } catch (error) {
    console.error('Error updating user ID in refugees', error);
    throw error;
  }
}


async function updateFamilyId(familyIdToChange, new_value) {
  try {
    const query = 'UPDATE refugees SET family_id = ? WHERE family_id = ?';
    await db.query(query, [new_value, familyIdToChange]);
    console.log('Family ID updated in refugees');
  } catch (error) {
    console.error('Error updating Family ID in refugees', error);
    throw error;
  }
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    updateUserId,
    updateFamilyId,
    getAllInFamily,
};
