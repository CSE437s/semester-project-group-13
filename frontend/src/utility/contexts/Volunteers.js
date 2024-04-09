import axios from 'axios'

const handleCreateVolunteer = (formData) => {
  axios.post('http://localhost:8080/volunteer/create', formData)
    .then((response) => {
      const data = response.data
      console.log('Form data submitted:', formData)
    }).catch((error) => {
      if (error.s) { console.error('Error submitting form:', error) }
    })
}

const handleEditVolunteer = (formData) => {
  const endpoint = 'http://localhost:8080/volunteer/' + formData.volunteer_id + '/update'
  axios.put(endpoint, formData)
    .then((response) => {
      const data = response.data
      console.log('Form data submitted:', formData)
    }).catch((error) => {
      if (error.s) { console.error('Error submitting form:', error) }
    })
}

const handleDeleteVolunteer = (formData) => {
  const endpoint = 'http://localhost:8080/volunteer/' + formData.volunteer_id + '/deleteOne'
  axios.delete(endpoint)
    .then((response) => {
      const data = response.data
      console.log('Form data submitted:', formData)
    }).catch((error) => {
      if (error.s) { console.error('Error submitting form:', error) }
    })
}

const volunteerCreateFields = [
  { name: 'first_name', label: 'First Name', type: 'text' },
  { name: 'last_name', label: 'Last Name', type: 'text' },
  { name: 'date_of_birth', label: 'Date of Birth', type: 'date' },
  { name: 'phone_number', label: 'Phone Number', type: 'tel' },
  { name: 'family_id', label: 'Family', type: 'id', contextType: 'family' }
]

const volunteerEditFields = [
  { name: 'first_name', label: 'First Name', type: 'text' },
  { name: 'last_name', label: 'Last Name', type: 'text' },
  { name: 'phone_number', label: 'Phone Number', type: 'tel' },
  { name: 'family_id', label: 'Family', type: 'id', contextType: 'family' }
]

const volunteerViewFields = [
  { name: 'first_name', label: 'First Name', type: 'text' },
  { name: 'last_name', label: 'Last Name', type: 'text' },
  { name: 'date_of_birth', label: 'Date of Birth', type: 'date' },
  { name: 'phone_number', label: 'Phone Number', type: 'tel' },
  { name: 'family_id', label: 'Family', type: 'id', contextType: 'family' }
]

const VolunteerContext = {
  type: 'volunteer',
  id: 'volunteer_id',
  getAllEndpoint: 'http://localhost:8080/volunteer',
  getOneEndpoint: (id) => `http://localhost:8080/volunteer/${id}`,
  create: handleCreateVolunteer,
  edit: handleEditVolunteer,
  delete: handleDeleteVolunteer,
  createFields: volunteerCreateFields,
  editFields: volunteerEditFields,
  viewFields: volunteerViewFields,
  createTitle: 'Add Volunteer',
  editTitle: 'Edit Volunteer',
  viewTitle: 'View Volunteer' // TO-DO: viewDialog should provide its own title, so we can provide the first and last family name
}

export default VolunteerContext
