const familyService = require('../services/family.service');


async function getAll(req, res, next) {
    try {
      res.json(await familyService.getAll());
    } catch (err) {
      console.error('Error while getting all families', err.message);
      next(err);
    }
  }

  async function getSome(req, res, next) {
    try {
        const { startIndex, limit } = req.query;
        res.json(await familyService.getSome(startIndex, limit));
    } catch (err) {
        console.error('Error while getting some families', err.message);
        next(err);
    }
}
  
async function getOne(req, res, next) {
    try {
        const { family_id } = req.params;
        res.json(await familyService.getOne(family_id));
    } catch (err) {
        console.error('Error while getting one family', err.message);
        next(err);
    }
}

async function create(req, res) {
    try {
      const {
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
      } = req.body;
  
      const result = await familyService.create({
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
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error Creating Family', error);
      res.status(500).json({ error: 'Error creating family' });
    }
  }

  async function update(req, res) {
    try {
      const { family_id } = req.params; 
      const {
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
      } = req.body;

      const result = await familyService.update({
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
      });
  
      res.status(200).json(result);
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
          console.error('Error Updating Family: This family is referenced by other records.');
          return res.status(400).json({ error: 'This family is referenced by other records and cannot be updated.' });
      }

      console.error('Error Updating Family', error);
      res.status(500).json({ error: 'Error updating family' });
  }
}

async function deleteOne(req, res) {
  try {
    const { family_id } = req.params; 
    const {
      is_deleted
    } = req.body;

    const result = await familyService.deleteOne({
      is_deleted,
    });

    res.status(200).json(result);
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        console.error('Error Deleting Family: This family is referenced by other records.');
        return res.status(400).json({ error: 'This family is referenced by other records and cannot be Deleted.' });
    }

    console.error('Error Deleting Family', error);
    res.status(500).json({ error: 'Error Deleting family' });
}
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    getSome,
};
