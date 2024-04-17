const db = require('./db.service');

async function getAll() {
    const rows = await db.query('SELECT * FROM families');
    return {
        data: rows,
    };
}

async function getSome(startIndex, limit) {
  console.log('Start Index:', startIndex);
  console.log('Limit:', limit);
  try {
      const query = 'SELECT * FROM families LIMIT ?, ?';
      const rows = await db.query(query, [startIndex, limit]);
      return {
          data: rows,
      };
  } catch (err) {
      console.error('Error while getting some families', err.message);
      throw err;
  }
}

async function getFamiliesPerCountry() {
  try {
      const query = 'SELECT CountryOfOrigin, COUNT(*) AS NumberOfFamilies FROM families GROUP BY CountryOfOrigin';
      const rows = await db.query(query);
      return {
          data: rows,
      };
  } catch (error) {
      console.error('Error while getting families per country', error);
      throw error;
  }
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
    user_id,
    IsRefugeeFamily,
    IsOpenToHaveGoodNeighbor,
    IsGoodNeighbor,
    DesiresToBeGoodNeighbor,
    Languages,
    is_deleted,
    FamilyName,
    LatestDateAtOasis,
    DateCreated,
    ArrivalDate,
    CountryOfOrigin,
    EnteredBy,
    Scheduled,
    address,
    zip_code,
    city
  }) {
    try {
      const duplicateEntries = await checkForDuplicates(address);
  
      if (duplicateEntries.length > 0) {
        return {
          success: false,
          message: 'Warning: There are duplicate entries with the same address.',
          duplicates: duplicateEntries
        };
      }
  
      const query =
        'INSERT INTO families (head_of_household, last_name, address, city, zip, is_refugee, is_good_neighbor, user_id, is_deleted, family_name, latest_date_at_oasis, date_created, arrival_date, country_of_origin, entered_by, scheduled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
      const results = await db.query(query, [
        user_id,
        IsRefugeeFamily,
        IsOpenToHaveGoodNeighbor,
        IsGoodNeighbor,
        DesiresToBeGoodNeighbor,
        Languages,
        is_deleted,
        FamilyName,
        LatestDateAtOasis,
        DateCreated,
        ArrivalDate,
        CountryOfOrigin,
        EnteredBy,
        Scheduled,
        address,
        zip_code,
        city
      ]);
  
      const family_id = results.insertId;
      console.log('Family created with ID:', family_id);
      return { success: true, family_id };
    } catch (error) {
      console.error('Error Creating Family', error);
      throw error;
    }
  }
  
  async function checkForDuplicates(address) {
    try {
      // Query to check for duplicates based on address
      const query = 'SELECT * FROM families WHERE address = ?';
      const rows = await db.query(query, [address]);
      return rows;
    } catch (error) {
      console.error('Error checking for duplicates', error);
      throw error;
    }
  }
  
  
async function update({
  IsRefugeeFamily,
  IsOpenToHaveGoodNeighbor,
  IsGoodNeighbor,
  DesiresToBeGoodNeighbor,
  Languages,
  FamilyName,
  address,
  zip_code,
  city,
  family_id
}) {
  try {
    const query = `
      UPDATE families 
      SET IsRefugeeFamily = ?, IsOpenToHaveGoodNeighbor = ?, IsGoodNeighbor = ?, DesiresToBeGoodNeighbor = ?, Languages = ?, FamilyName = ?, address = ?, zip_code = ?, city = ?
      WHERE family_id = ?
    `;

    const results = await db.query(query, [
      IsRefugeeFamily,
      IsOpenToHaveGoodNeighbor,
      IsGoodNeighbor,
      DesiresToBeGoodNeighbor,
      Languages,
      FamilyName,
      address,
      zip_code,
      city,
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
  let is_deleted = 1;
  try {
    const query = `
      UPDATE families 
      SET is_deleted = ?
      WHERE family_id = ?
    `;

    const results = await db.query(query, [
      is_deleted,
      family_id
    ]);

    console.log('Family deleted with ID:', family_id);
    return { success: true, family_id };
  } catch (error) {
    console.error('Error deleting Family', error);
    throw error;
  }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    getSome,
    getFamiliesPerCountry,
};
