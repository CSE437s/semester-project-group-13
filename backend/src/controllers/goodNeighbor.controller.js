const neighborService = require('../services/goodNeighbor.service');

async function getAll(req, res, next) {
  try {
    res.json(await neighborService.getAll());
  } catch (err) {
    console.error('Error while getting all neighbors', err.message);
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const { neighbor_id } = req.params;
    res.json(await neighborService.getOne(neighbor_id));
  } catch (err) {
    console.error('Error while getting one neighbor', err.message);
    next(err);
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
    const query = `
      INSERT INTO neighbors (Refugee_Family_ID, FamilyID, Birthday, Email, FirstName, LastName, Gender, PhoneNumber, Relation, is_head_of_house, is_deleted)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    ]);

    const neighbor_id = results.insertId;
    console.log('Neighbor created with ID:', neighbor_id);
    return { success: true, neighbor_id };
  } catch (error) {
    console.error('Error Creating Neighbor', error);
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
      UPDATE neighbors 
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
      neighbor_id
    ]);

    console.log('Neighbor updated with ID:', neighbor_id);
    return { success: true, neighbor_id };
  } catch (error) {
    console.error('Error updating Neighbor', error);
    throw error;
  }
}

async function deleteOne(req, res) {
  try {
    const { neighbor_id } = req.params; 
    const {
      is_deleted
    } = req.body;

    const result = await neighborService.deleteOne({
      is_deleted,
    });

    res.status(200).json(result);
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        console.error('Error Deleting Neighbor: This Neighbor is referenced by other records.');
        return res.status(400).json({ error: 'This Neighbor is referenced by other records and cannot be Deleted.' });
    }

    console.error('Error Deleting Neighbor', error);
    res.status(500).json({ error: 'Error Deleting Neighbor' });
}
}


module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
