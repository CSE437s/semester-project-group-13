const db = require('./db.service');
//const axios = require('axios');

async function getAll() {
  try {
    const rows = await db.query('SELECT * FROM geocodes');
    return {
      data: rows,
    };
  } catch (error) {
    console.error('Error while getting all Geocodes', error);
    throw error;
  }
}

async function getOne(geocode_id) {
  try {
    const sql = 'SELECT * FROM geocodes WHERE geocode_id = ?';
    console.log('Executing query:', sql, geocode_id);

    const rows = await db.query(sql, [geocode_id]);
    return { data: rows[0] };
  } catch (error) {
    console.error('Error while getting one geocode', error);
    throw error;
  }
}

async function create({
  family_id,
  latitude,
  longitude,
  is_deleted,
}) {
  try {
    const query =
      'INSERT INTO geocodes (family_id, latitude, longitude, is_deleted) VALUES (?, ?, ?, ?)';

    const results = await db.query(query, [
      family_id,
      latitude,
      longitude,
      is_deleted,
    ]);

    const geocode_ID = results.insertId;
    console.log('Geocode created with ID:', geocode_ID);
    return { success: true, geocode_ID };
  } catch (error) {
    console.error('Error Creating Geocode', error);
    throw error;
  }
}

async function update({
  geocode_id,
  family_id,
  latitude,
  longtiude,
  is_deleted,
}) {
  try {
    const query = `
      UPDATE geocodes 
      SET family_id = ?, latitude = ?, longitude = ?, is_deleted = ?
      WHERE geocode_id = ?
    `;

    const results = await db.query(query, [
      family_id,
      latitude,
      longtiude,
      is_deleted,
      geocode_id,
    ]);

    console.log('Geocode updated with ID:', geocode_id);
    return { success: true, geocode_id };
  } catch (error) {
    console.error('Error updating Geocode', error);
    throw error;
  }
}

async function deleteOne(geocode_id) {
  let is_deleted = 1;
  try {
    const query = `
      UPDATE geocodes 
      SET is_deleted = ?
      WHERE geocode_id = ?
    `;

    const results = await db.query(query, [
      is_deleted,
      geocode_id
    ]);

    console.log('geocode deleted with ID:', geocode_id);
    return { success: true, geocode_id };
  } catch (error) {
    console.error('Error deleting Geocode', error);
    throw error;
  }
}

// async function geocode(address, family_id) {
//   try {
//     // Make a request to the geocoding service (e.g., Nominatim) to obtain coordinates for the address
//     const response = await axios.get('https://nominatim.openstreetmap.org/search', {
//       params: {
//         q: address,
//         format: 'json',
//         limit: 1
//       }
//     });

//     // Extract latitude and longitude from the response
//     const { lat, lon } = response.data[0];

//     // Save the geocoded data into the database (geocodes table)
//     await geocodes.create({
//       family_id,
//       latitude: lat,
//       longitude: lon,
//       is_deleted,
//     });

//     // Return the geocoded coordinates
//     return { latitude: lat, longitude: lon };
//   } catch (error) {
//     // Handle errors, such as network issues or invalid addresses
//     throw new Error(`Geocoding error: ${error.message}`);
//   }
// }
  
  module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    //geocode,
  };
  