const donatorService = require('../services/donator.service');
const donationService = require('../services/donation.service');


async function getAll(req, res, next) {
    try {
        res.json(await donatorService.getAll());
    } catch (err) {
        console.error('Error while getting all donators', err.message);
        next(err);
    }
}

async function getOne(req, res, next) {
    try {
        const { donator_id } = req.params;
        res.json(await donatorService.getOne(donator_id));
    } catch (err) {
        console.error('Error while getting one donator', err.message);
        next(err);
    }
}

async function create(req, res) {
    try {
      const {
        first_name,
        last_name,
        is_head_of_house,
        family_id,
        birthday,
        phone_number,
        user_id,
        city,
        is_deleted,
        relation_to_head,
        address,
        email,
        zip_code,
      } = req.body;
  
      const result = await donatorService.create({
        first_name,
        last_name,
        is_head_of_house,
        family_id,
        birthday,
        phone_number,
        user_id,
        city,
        is_deleted,
        relation_to_head,
        address,
        email,
        zip_code,
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error Creating Donator', error.message);
      res.status(500).json({ error: 'Error creating donator' });
    }
  }
  
async function update(req, res) {
    try {
        const { donator_id } = req.params;

        const {
            first_name,
        last_name,
        is_head_of_house,
        family_id,
        birthday,
        phone_number,
        user_id,
        city,
        is_deleted,
        relation_to_head,
        address,
        email,
        zip_code,
        } = req.body;


    await donatorService.update(donator_id, {
        first_name,
        last_name,
        is_head_of_house,
        family_id,
        birthday,
        phone_number,
        user_id,
        city,
        is_deleted,
        relation_to_head,
        address,
        email,
        zip_code,
    });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error updating donator', error.message);
        res.status(500).json({ error: 'Error updating donator' });
    }
}

async function deleteOne(req, res) {
    try {
      const { donator_id } = req.params; 
      const {
        is_deleted,
      } = req.body;
  
      const result = await donatorService.deleteOne({
        donator_id,
        is_deleted
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error Deleting Donator', error.message);
      res.status(500).json({ error: 'Error Deleting donator' });
    }
  }
  


module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
};
