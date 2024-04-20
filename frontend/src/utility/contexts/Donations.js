import axios from "axios";

const handleCreateDonation = (formData) => {
    formData['is_deleted'] = 0;
    axios.post('http://localhost:8080/donation/create', formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleEditDonation = (formData) => {
    const endpoint  = 'http://localhost:8080/donation/' + formData['donation_id'] + '/update'
    axios.post(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleDeleteDonation = (formData) => {
    const endpoint  = 'http://localhost:8080/donation/' + formData['donation_id'] + '/deleteOne'
    axios.delete(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
}

const donationCreateFields = [
{ name: 'item', label: 'Item', type: 'text' },
{ name: 'amount', label: 'Amount', type: 'number' },
{ name: 'completed', label: 'Completed?', type: 'bool'},
{ name: 'date', label: 'Date of Donation', type: 'date' },
{ name: 'family_id', label: 'Given By', type: 'id', contextType: "family"},
{ name: 'user_id', label: 'User', type: 'id', contextType: 'user'},
];

const donationEditFields = [
{ name: 'item', label: 'Item', type: 'text' },
{ name: 'amount', label: 'Amount', type: 'number' },
{ name: 'completed', label: 'Completed?', type: 'bool'},
];

const donationViewFields = [
{ name: 'item', label: 'Item', type: 'text' },
{ name: 'amount', label: 'Amount', type: 'number' },
{ name: 'completed', label: 'Completed?', type: 'bool'},
{ name: 'family_id', label: 'Given By', type: 'id', contextType: "family"},
{ name: 'user_id', label: 'Entered By', type: 'id', contextType: 'user'},
];

const donationDisplayFields = [
    { name: 'item', label: 'Item', type: 'text' },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'completed', label: 'Completed?', type: 'bool'},
]

const DonationContext = {
    type: "donation",
    id: "donation_id",
    getAllEndpoint: "http://localhost:8080/donation",
    getSomeEndpoint: "http://localhost:8080/donation/some",
    getOneEndpoint: (id) => `http://localhost:8080/donation/${id}`,
    create: handleCreateDonation,
    edit: handleEditDonation,
    delete: handleDeleteDonation,
    createFields: donationCreateFields,
    editFields: donationEditFields,
    viewFields: donationViewFields,
    displayFields: donationDisplayFields,
    createTitle: "Add Donation",
    editTitle: "Edit Donation",
    viewTitle: "View Donation", //TO-DO: viewDialog should provide its own title, so we can provide the first and last family name
  };
  
  export default DonationContext;