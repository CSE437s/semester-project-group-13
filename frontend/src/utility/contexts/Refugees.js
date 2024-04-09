import axios from 'axios'

// this logic should be handled by the family page in the future
const handleCreateRefugee = (formData) => {
  axios
    .post('http://localhost:8080/refugee/create', formData)
    .then((response) => {
      const data = response.data
      console.log('Form data submitted:', formData)
    })
    .catch((error) => {
      if (error.s) console.error('Error submitting form:', error)
    })
}

const handleEditRefugee = (formData) => {
  const endpoint =
    'http://localhost:8080/refugee/' + formData.refugee_id + '/update'
  axios
    .put(endpoint, formData)
    .then((response) => {
      const data = response.data
      console.log('Form data submitted:', formData)
    })
    .catch((error) => {
      if (error.s) console.error('Error submitting form:', error)
    })
}

const handleDeleteRefugee = (formData) => {
  const endpoint =
    'http://localhost:8080/refugee/' + formData.refugee_id + '/deleteOne'
  axios
    .delete(endpoint)
    .then((response) => {
      const data = response.data
      console.log('Form data submitted:', data)
    })
    .catch((error) => {
      if (error.s) console.error('Error submitting form:', error)
    })
}

const refugeeCreateFields = [
  { name: 'first_name', label: 'First Name', type: 'text' },
  { name: 'last_name', label: 'Last Name', type: 'text' },
  { name: 'country_of_origin', label: 'Country of Origin', type: 'text' },
  { name: 'gender', label: 'Gender', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone_number', label: 'Phone Number', type: 'tel' },
  { name: 'date_of_birth', label: 'Date of Birth', type: 'date' },
  {
    name: 'date_of_arrival_to_us',
    label: 'Date of Arrival [to US]',
    type: 'date'
  },
  {
    name: 'date_of_joining_oasis',
    label: 'Date of Arrival [to Oasis]',
    type: 'date'
  },
  { name: 'family_id', label: 'Family', type: 'id', contextType: 'family' }
]

const refugeeEditFields = [
  { name: 'first_name', label: 'First Name', type: 'text' },
  { name: 'last_name', label: 'Last Name', type: 'text' },
  { name: 'gender', label: 'Gender', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone_number', label: 'Phone Number', type: 'tel' },
  { name: 'family_id', label: 'Family', type: 'id', contextType: 'family' }
]

const refugeeViewFields = [
  { name: 'first_name', label: 'First Name', type: 'text' },
  { name: 'last_name', label: 'Last Name', type: 'text' },
  { name: 'country_of_origin', label: 'Country of Origin', type: 'text' },
  { name: 'gender', label: 'Gender', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone_number', label: 'Phone Number', type: 'tel' },
  { name: 'date_of_birth', label: 'Date of Birth', type: 'date' },
  {
    name: 'date_of_arrival_to_us',
    label: 'Date of Arrival [to US]',
    type: 'date'
  },
  {
    name: 'date_of_joining_oasis',
    label: 'Date of Arrival [to Oasis]',
    type: 'date'
  },
  { name: 'family_id', label: 'Family', type: 'id', contextType: 'family' }
]

const RefugeeContext = {
  type: 'refugee',
  id: 'refugee_id',
  getAllEndpoint: 'http://localhost:8080/refugee',
  getOneEndpoint: (id) => `http://localhost:8080/refugee/${id}`,
  create: handleCreateRefugee,
  edit: handleEditRefugee,
  delete: handleDeleteRefugee,
  createFields: refugeeCreateFields,
  editFields: refugeeEditFields,
  viewFields: refugeeViewFields,
  createTitle: 'Add Refugee',
  editTitle: 'Edit Refugee',
  viewTitle: 'View Refugee' // TO-DO: viewDialog should provide its own title, so we can provide the first and last refugee name
}

export default RefugeeContext
