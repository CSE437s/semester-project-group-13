import axios from "axios";

const handleCreateFamily = (formData) => {
    axios.post('http://localhost:8080/family/create', formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleEditFamily = (formData) => {
    const endpoint  = 'http://localhost:8080/family/' + formData['family_id'] + '/update'
    axios.put(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleDeleteFamily = (formData) => {
    const endpoint  = 'http://localhost:8080/family/' + formData['family_id'] + '/deleteOne'
    axios.delete(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
}

const familyCreateFields = [
    { name: 'head_of_household', label: 'Head of Household', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text' },
    { name: 'address', label: 'Street Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zip', label: 'Zip Code', type: 'number' },
    { name: 'is_refugee', label: 'Is Refugee?', type: 'checkbox' },
    { name: 'is_good_neighbor', label: 'Is Good Neighbor?', type: 'checkbox' }
  ];

  const familyEditFields = [
    { name: 'head_of_household', label: 'Head of Household', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text' },
    { name: 'address', label: 'Street Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zip', label: 'Zip Code', type: 'number' },
    { name: 'is_refugee', label: 'Is Refugee?', type: 'checkbox' },
    { name: 'is_good_neighbor', label: 'Is Good Neighbor?', type: 'checkbox' }
  ];

  const familyViewFields = [
    { name: 'head_of_household', label: 'Head of Household', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text' },
    { name: 'address', label: 'Street Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zip', label: 'Zip Code', type: 'number' },
    { name: 'is_refugee', label: 'Is Refugee?', type: 'checkbox' },
    { name: 'is_good_neighbor', label: 'Is Good Neighbor?', type: 'checkbox' }
  ];

  const FamilyContext = {
    type: "family",
    id: "family_id",
    getAllEndpoint: "http://localhost:8080/family",
    create: handleCreateFamily,
    edit: handleEditFamily,
    delete: handleDeleteFamily,
    createFields: familyCreateFields,
    editFields: familyEditFields,
    viewFields: familyViewFields,
    createTitle: "Add Family",
    editTitle: "Edit Family",
    viewTitle: "View Family", //TO-DO: viewDialog should provide its own title, so we can provide the first and last family name
  };
  
  export default FamilyContext;
