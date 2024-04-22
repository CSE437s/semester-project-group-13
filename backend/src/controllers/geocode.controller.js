const geocodeService = require('../services/geocode.service');

async function getAll(req, res, next) {
    try {
      res.json(await geocodeService.getAll());
    } catch (err) {
      console.error('Error while getting all geocodes', err.message);
      next(err);
    }
  }
  
  async function getOne(req, res, next) {
    try {
      const { geocode_id } = req.params;
      res.json(await geocodeService.getOne(geocode_id));
    } catch (err) {
      console.error('Error while getting one geocode', err.message);
      next(err);
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
        `INSERT INTO geocodes (family_id, latitude, longitude, is_deleted) VALUES (?, ?, ?, ?)`;
  
      const results = await db.query(query, [
        family_id,
        latitude,
        longitude,
        is_deleted,
      ]);
  
      const geocode_id = results.insertId;
      console.log('Geocode created with ID:', geocode_id);
      return { success: true, geocode_id };
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
  
  async function deleteOne(req, res) {
    try {
      const { geocode_id } = req.params; 
      const {
        is_deleted
      } = req.body;
  
      const result = await geocodeService.deleteOne({
        is_deleted,
      });
  
      res.status(200).json(result);
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
          console.error('Error Deleting Geocode: This Geocode is referenced by other records.');
          return res.status(400).json({ error: 'This Geocode is referenced by other records and cannot be Deleted.' });
      }
  
      console.error('Error Deleting Geocode', error);
      res.status(500).json({ error: 'Error Deleting Geocode' });
  }
  }

  
// async function geocode(req, res, next) {
//   try {
//     const { address } = req.body; // Assuming address is sent in the request body
//     await geocodeService.geocode(address);
//     res.status(200).json({ success: true, message: 'Geocoding successful' });
//   } catch (error) {
//     console.error('Error geocoding address:', error);
//     res.status(500).json({ error: 'Error geocoding address' });
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
