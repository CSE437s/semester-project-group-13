const refugeeService = require('../services/refugee.service')

async function getAll (req, res, next) {
  try {
    res.json(await refugeeService.getAll())
  } catch (err) {
    console.error('Error while getting all refugees', err.message)
    next(err)
  }
}

async function getAllInFamily (req, res, next) {
  try {
    const { family_id } = req.params
    const refugees = await refugeeService.getAllInFamily(family_id)
    res.json(refugees)
  } catch (err) {
    console.error('Error while getting all refugees in a family', err.message)
    next(err)
  }
}

async function getOne (req, res, next) {
  try {
    const { refugee_id } = req.params
    res.json(await refugeeService.getOne(refugee_id))
  } catch (err) {
    console.error('Error while getting one refugee', err.message)
    next(err)
  }
}

async function create (req, res) {
  try {
    const {
      first_name,
      last_name,
      family_id,
      is_head_of_house,
      birthday,
      gender,
      relation_to_head,
      phone,
      is_deleted
    } = req.body

    const result = await refugeeService.create({
      first_name,
      last_name,
      family_id,
      is_head_of_house,
      birthday,
      gender,
      relation_to_head,
      phone,
      is_deleted
    })

    res.status(200).json(result)
  } catch (error) {
    console.error('Error Creating Refugee', error.message)
    res.status(500).json({ error: 'Error creating refugee' })
  }
}

async function update (req, res) {
  try {
    const { refugee_id } = req.params
    const {
      first_name,
      last_name,
      family_id,
      is_head_of_house,
      birthday,
      gender,
      relation_to_head,
      phone,
      is_deleted
    } = req.body

    await refugeeService.update(refugee_id, {
      first_name,
      last_name,
      family_id,
      is_head_of_house,
      birthday,
      gender,
      relation_to_head,
      phone,
      is_deleted
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error updating refugee', error.message)
    res.status(500).json({ error: 'Error updating refugee' })
  }
}

async function deleteOne (req, res) {
  try {
    const { refugee_id } = req.params
    const {
      is_deleted
    } = req.body

    await refugeeService.update(refugee_id, {
      is_deleted
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error deleting refugee', error.message)
    res.status(500).json({ error: 'Error deleting refugee' })
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  getAllInFamily
}
