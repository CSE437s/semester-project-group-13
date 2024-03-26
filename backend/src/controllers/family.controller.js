const familyService = require('../services/family.service');

const donationService = require('../services/donation.service');
const refugeeService = require('../services/refugee.service');
const volunteerService = require('../services/volunteer.service');
const requestService = require('../services/requests.service');
const goodNeighborService = require('../services/goodNeighbor.service')


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
        //head_of_household_id,
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
  
      if (!head_of_household_id || !head_of_household || !last_name || !address || !city || !zip || !user_id) {
        console.error('Error Creating Family: Missing required inputs');
        return res.status(400).json({ error: 'Missing required inputs' });
    }
      const result = await familyService.create({
        //head_of_household_id,
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
      const { family_id } = req.params; 
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
  
      if (!head_of_household || !last_name || !address || !city || !zip || !user_id) {
        console.error('Error Updating Family: Missing required inputs');
        return res.status(400).json({ error: 'Missing required inputs' });
    }
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

    const family = await familyService.getOne(family_id);


    if (family && family.is_refugee) {
      await Promise.all([
        donationService.updateRecievingFamilyId(family_id, 1),
        requestService.updateFamilyId(family_id, 1),
        goodNeighborService.updateRefugeeFamilyId(family_id, 1),
        refugeeService.updateFamilyId(family_id, 1)
      ]);
    } else {
      await Promise.all([
        donationService.updateGivingFamilyId(family_id, 2),
        volunteerService.updateFamilyId(family_id, 2),
        goodNeighborService.updateHostingFamilyId(family_id, 2),
      ]);
    }

    await familyService.deleteOne(family_id);
    res.status(200).json({ success: true });
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        console.error('Error Deleting Family: This family is referenced by other records.');
        return res.status(400).json({ error: 'This family is referenced by other records and cannot be deleted.' });
    }

    console.error('Error deleting family', error);
    res.status(500).json({ error: 'Error deleting family' });
}
}

async function getAllRefugeesInFamily(req, res) {
  try {
    const { family_id } = req.params;
    const refugees = await refugeeService.getAllInFamily(family_id);
    res.json(refugees);
  } catch (error) {
    console.error('Error getting refugees in family', error);
    res.status(500).json({ error: 'Error getting refugees in family' });
  }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    getAllRefugeesInFamily,

};
