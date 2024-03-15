const familyService = require('../services/family.service');


async function getAll(req, res, next) {
    try {
      res.json(await familyService.getAll());
    } catch (err) {
      console.error('Error while getting all families', err.message);
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
        head_of_household_id,
        head_of_household,
        last_name,
        address,
        city,
        zip,
        is_refugee,
        is_good_neighbor,
        good_neighbor,
        user_id,
      } = req.body;
  
      const result = await familyService.create({
        head_of_household_id,
        head_of_household,
        last_name,
        address,
        city,
        zip,
        is_refugee,
        is_good_neighbor,
        good_neighbor,
        user_id,
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error Creating Family', error);
      res.status(500).json({ error: 'Error creating family' });
    }
  }

  async function update(req, res) {
    try {
      const { family_id } = req.params; // Get family_id from URL path params
      const {
        head_of_household,
        last_name,
        address,
        city,
        zip,
        is_refugee,
        is_good_neighbor,
        user_id,
      } = req.body;
  
      const result = await familyService.update({
        family_id,
        head_of_household,
        last_name,
        address,
        city,
        zip,
        is_refugee,
        is_good_neighbor,
        user_id,
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error Updating Family', error);
      res.status(500).json({ error: 'Error updating family' });
    }
  }
  
  

module.exports = {
    getAll,
    getOne,
    create,
    update,
};
