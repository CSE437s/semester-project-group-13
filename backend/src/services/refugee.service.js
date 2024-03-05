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


module.exports = {
    getAll,
    getOne,
    create,
};
