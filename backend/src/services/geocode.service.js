const db = require('./db.service');
const axios = require('axios');
const nominatim = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/',
  headers: {
    'User-Agent': 'MapComponent/1.0 (b.heller@wustl.edu)',
  },
});

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

async function getGeocodeAndFamily() {
  try {
    const sql = 'SELECT g.family_id, g.latitude, g.longitude, f.isRefugeeFamily FROM geocodes g JOIN families f ON g.family_id = f.family_id WHERE g.is_deleted = 0';
    console.log('Executing query:', sql);

    const rows = await db.query(sql);
    return { data: rows };
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
    // Check if a geocode already exists for this family_id
    const existingGeocode = await db.query(
      'SELECT * FROM geocodes WHERE family_id = ? AND is_deleted = 0',
      [family_id]
    );

    if (existingGeocode.length > 0) {
      // If there's already a geocode, skip insertion and return the existing one
      return { success: false, message: 'Geocode already exists for this family_id' };
    }

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
    throw new Error('Failed to create geocode.');
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


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function geocode(address, zip_code, family_id) {
  try {
    // Make a request to the geocoding service (e.g., Nominatim) to obtain coordinates for the address
    const fullAddress = `${address}, ${zip_code}`;

    await delay(100);

    const response = await nominatim.get('search', {
      params: {
        q: fullAddress,
        format: 'json',
        limit: 1
      }
    });

    // Extract latitude and longitude from the response
    if (response.data.length === 0) {
      console.error(`No geocode found for address: ${fullAddress}`);
      const geocodeResult = await create({
        family_id,
        latitude: null,
        longitude: null,
        is_deleted: 0,
      });
      return null;
    }

    const { lat, lon } = response.data[0];

    // Ensure that lat and lon are defined
    if (lat === undefined || lon === undefined) {
      console.error(`Geocoding returned invalid data for address: ${fullAddress}`);
      return null; // Return null to indicate failure
    }

    // Save the geocoded data into the database (geocodes table)
    const geocodeResult = await create({
      family_id,
      latitude: lat,
      longitude: lon,
      is_deleted: 0,
    });

    if (!geocodeResult.success) {
      console.error('Geocode already exists for family_id:', family_id);
      return null;
    }

    // Return the geocoded coordinates
    return { latitude: lat, longitude: lon };
  } catch (error) {
    // Handle errors, such as network issues or invalid addresses
    console.error('Geocoding error:', error);
    await create({
      family_id,
      latitude: null,
      longitude: null,
      is_deleted: 0,
    });
    return null; // Creates a null record
    throw new Error(`Geocoding error: ${error.message}`);
  }
}

async function getGeocodeFamilies() {
  try {
    const query = `
      SELECT family_id, address, zip_code 
      FROM families 
      WHERE address IS NOT NULL 
        AND family_id NOT IN (SELECT family_id FROM geocodes WHERE is_deleted = 0)
    `;
    const results = await db.query(query);
    console.log(results);
    return results; // Returns list of families needing geocoding
  } catch (error) {
    console.error('Error fetching families needing geocoding:', error);
    throw error;
  }
}

async function geocodeFamilies() {
  try {
    const families = await getGeocodeFamilies(); // Uses the service function
    for (const family of families) {
      const { family_id, address, zip_code } = family;

      const geocodeResult = await geocode(address, zip_code, family_id);
      
      if (!geocodeResult) {
        console.error(`No valid coordinates found for family ID: ${family_id}`);
        continue; // Skip to the next iteration
      }

      const { latitude, longitude } = geocodeResult;

      console.log(`Successfully geocoded family ${family_id} with coordinates:`, {
        latitude,
        longitude,
      });
      
    }

    console.log('Successfully geocoded families');
    return {success: true};
  } catch (error) {
    console.error('Error during geocoding families:', error);
    throw error;
  }
}
  
  module.exports = {
    getAll,
    getOne,
    getGeocodeAndFamily,
    create,
    update,
    deleteOne,
    geocode,
    getGeocodeFamilies,
    geocodeFamilies,
  };
  