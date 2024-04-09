import axios from 'axios'

const handleCreateDonation = (formData) => {
  axios.post('http://localhost:8080/donation/create', formData)
    .then((response) => {
      const data = response.data
      console.log('Form data submitted:', formData)
    }).catch((error) => {
      if (error.s) { console.error('Error submitting form:', error) }
    })
}

const handleEditDonation = (formData) => {
  const endpoint = 'http://localhost:8080/donation/' + formData.donation_id + '/update'
  axios.post(endpoint, formData)
    .then((response) => {
      const data = response.data
      console.log('Form data submitted:', formData)
    }).catch((error) => {
      if (error.s) { console.error('Error submitting form:', error) }
    })
}

const handleDeleteDonation = (formData) => {
  const endpoint = 'http://localhost:8080/donation/' + formData.donation_id + '/deleteOne'
  axios.delete(endpoint, formData)
    .then((response) => {
      const data = response.data
      console.log('Form data submitted:', formData)
    }).catch((error) => {
      if (error.s) { console.error('Error submitting form:', error) }
    })
}

const donationCreateFields = [
  { name: 'item', label: 'Item', type: 'text' },
  { name: 'quantity', label: 'Quantity', type: 'number' },
  { name: 'completed', label: 'Completed?', type: 'bool' }, // needs unique typing
  { name: 'giving_family', label: 'Given By (Family)', type: 'id', contextType: 'family' },
  { name: 'giving_volunteer', label: 'Given By (Member)', type: 'id', contextType: 'volunteer' },
  { name: 'recieving_family', label: 'Recieved By (Family)', type: 'id', contextType: 'family' },
  { name: 'recieving_refugee', label: 'Recieved By (Member)', type: 'id', contextType: 'refugee' },
  { name: 'user_id', label: 'User', type: 'id' }
]

const donationEditFields = [
  { name: 'item', label: 'Item', type: 'text' },
  { name: 'quantity', label: 'Quantity', type: 'number' },
  { name: 'completed', label: 'Completed?', type: 'bool' }
]

const donationViewFields = [
  { name: 'item', label: 'Item', type: 'text' },
  { name: 'quantity', label: 'Quantity', type: 'number' },
  { name: 'completed', label: 'Completed?', type: 'bool' },
  { name: 'giving_family', label: 'Given By (Family)', type: 'id', contextType: 'family' },
  { name: 'recieving_family', label: 'Recieved By (Family)', type: 'id', contextType: 'family' }
]

const DonationContext = {
  type: 'donation',
  id: 'donation_id',
  getAllEndpoint: 'http://localhost:8080/donation',
  getOneEndpoint: (id) => `http://localhost:8080/donation/${id}`,
  create: handleCreateDonation,
  edit: handleEditDonation,
  delete: handleDeleteDonation,
  createFields: donationCreateFields,
  editFields: donationEditFields,
  viewFields: donationViewFields,
  createTitle: 'Add Donation',
  editTitle: 'Edit Donation',
  viewTitle: 'View Donation' // TO-DO: viewDialog should provide its own title, so we can provide the first and last family name
}

export default DonationContext
