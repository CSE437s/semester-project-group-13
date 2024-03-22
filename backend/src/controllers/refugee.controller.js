const refugeeService = require('../services/refugee.service');
const donationService = require('../services/donation.service');
const noteService = require('../services/notes.service');
const requestService = require('../services/requests.service');
const goodNeighborService = require('../services/goodNeighbor.service')
const familyService = require('../services/family.service');


async function getAll(req, res, next) {
    try {
        res.json(await refugeeService.getAll());
    } catch (err) {
        console.error('Error while getting all refugees', err.message);
        next(err);
    }
}

async function getOne(req, res, next) {
    try {
        const { refugee_id } = req.params;
        res.json(await refugeeService.getOne(refugee_id));
    } catch (err) {
        console.error('Error while getting one refugee', err.message);
        next(err);
    }
}

async function create(req, res) {
    try {
        const {
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
        } = req.body;

        if (!first_name || !last_name || !date_of_birth || !phone_number || !country_of_origin || !date_of_arrival_to_us || !date_of_joining_oasis || !gender || !email || !family_id) {
          throw new Error('Incomplete refugee data. Please provide all required fields.');
      }

        const result = await refugeeService.create({
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
        });

        res.status(200).json(result);
    } catch (error) {
        console.error('Error Creating Refugee', error.message);
        res.status(500).json({ error: 'Error creating refugee' });
    }
}

async function update(req, res) {
    try {
        const { refugee_id } = req.params;
        const {
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
        } = req.body;

        if (!first_name && !last_name && !date_of_birth && !phone_number && !country_of_origin && !date_of_arrival_to_us && !date_of_joining_oasis && !gender && !email && !family_id) {
          throw new Error('No data provided for update. Please provide at least one field to update.');
      }


        await refugeeService.update(refugee_id, {
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
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error updating refugee', error.message);
        res.status(500).json({ error: 'Error updating refugee' });
    }
}

async function deleteOne(req, res) {
    try {
        const { refugee_id } = req.params;

        await Promise.all([
          donationService.updateRefugeeId(refugee_id, 2),
          goodNeighborService.updateRefugeeId(refugee_id, 2),
          requestService.updateRefugeeId(refugee_id, 2),
          noteService.updateRefugeeId(refugee_id, 2),
          familyService.updateHeadOfFamily(refugee_id, 2),
        ]);

        await refugeeService.deleteOne(refugee_id);
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            console.error('Error deleting refugee: This refugee is referenced by other records.');
            return res.status(400).json({ error: 'This refugee is referenced by other records and cannot be deleted.' });
        }

        console.error('Error deleting refugee', error.message);
        res.status(500).json({ error: 'Error deleting refugee' });
    }
}



module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
};
