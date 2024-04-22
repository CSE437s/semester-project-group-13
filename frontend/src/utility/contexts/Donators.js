import axios from "axios";

const handleCreateDonator = (formData) => {
    formData['is_deleted'] = 0;
    axios.post('http://localhost:8080/donator/create', formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleEditDonator = (formData) => {
    const endpoint  = 'http://localhost:8080/donator/' + formData['donator_id'] + '/update'
    axios.put(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleDeleteDonator = (formData) => {
    const endpoint  = 'http://localhost:8080/donator/' + formData['donator_id'] + '/deleteOne'
    axios.delete(endpoint)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
}

const donatorCreateFields = [
{ name: 'first_name', label: 'First Name', type: 'text' },
{ name: 'last_name', label: 'Last Name', type: 'text' },
{ name: 'birthday', label: 'Date of Birth', type: 'date' },
{ name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
{ name: 'relation_to_head', label: 'Relation to Head of Household', type: 'text' },
{ name: 'phone_number', label: 'Phone Number', type: 'tel' },
{ name: 'email', label: 'Email Address', type: 'email' },
{ name: 'address', label: 'Address', type: 'text' },
{ name: 'city', label: 'City', type: 'text' },
{ name: 'zip_code', label: 'Zip Code', type: 'number' },
{name: 'gender', label: 'Gender', type: 'text'}, //radio?
{ name: 'family_id', label: 'Family', type: 'id', contextType: 'family'},
];

const donatorEditFields = [
    { name: 'first_name', label: 'First Name', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text' },
    { name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
    { name: 'relation_to_head', label: 'Relation to Head of Household', type: 'text' },
    { name: 'phone_number', label: 'Phone Number', type: 'tel' },
    { name: 'email', label: 'Email Address', type: 'email' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zip_code', label: 'Zip Code', type: 'number' },
    { name: 'family_id', label: 'Family', type: 'id', contextType: 'family'},
];

const donatorViewFields = [
    { name: 'first_name', label: 'First Name', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text' },
    { name: 'birthday', label: 'Date of Birth', type: 'date' },
    { name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
    { name: 'relation_to_head', label: 'Relation to Head of Household', type: 'text' },
    { name: 'phone_number', label: 'Phone Number', type: 'tel' },
    { name: 'email', label: 'Email Address', type: 'email' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zip_code', label: 'Zip Code', type: 'number' },
    {name: 'gender', label: 'Gender', type: 'text'}, //radio?
    { name: 'family_id', label: 'Family', type: 'id', contextType: 'family'},
];

const donatorDisplayFields = [
    { name: 'family_id', label: 'Family', type: 'id', contextType: 'family'},
    { name: 'first_name', label: 'First Name', type: 'text' },
    { name: 'phone_number', label: 'Phone Number', type: 'tel' },
    { name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
];

const DonatorContext = {
    type: "donator",
    id: "donator_id",
    getAllEndpoint: "http://localhost:8080/donator",
    getSomeEndpoint: "http://localhost:8080/donator/some",
    getOneEndpoint: (id) => `http://localhost:8080/donator/${id}`,
    create: handleCreateDonator,
    edit: handleEditDonator,
    delete: handleDeleteDonator,
    createFields: donatorCreateFields,
    editFields: donatorEditFields,
    viewFields: donatorViewFields,
    displayFields: donatorDisplayFields,
    createTitle: "Add Donator",
    editTitle: "Edit Donator",
    viewTitle: "View Donator", //TO-DO: viewDialog should provide its own title, so we can provide the first and last family name
  };
  
  export default DonatorContext;