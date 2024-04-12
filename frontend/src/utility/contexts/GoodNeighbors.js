import axios from "axios";

const handleCreateGoodNeighbor = (formData) => {
    formData['is_deleted'] = 0;
    axios.post('http://localhost:8080/neighbor/create', formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleEditGoodNeighbor = (formData) => {
    const endpoint  = 'http://localhost:8080/neighbor/' + formData['neighbor_id'] + '/update'
    axios.put(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleDeleteGoodNeighbor = (formData) => {
    const endpoint  = 'http://localhost:8080/neighbor/' + formData['neighbor_id'] + '/deleteOne'
    axios.delete(endpoint)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
}

const goodNeighborCreateFields = [
    { name: 'RefugeeFamilyID', label: 'Refugee Family', type: 'id', contextType: 'family' },
    { name: 'FamilyID', label: 'Host Family', type: 'id', contextType: 'family' }, 
    { name: 'FirstName', label: 'First Name', type: 'text' },
    { name: 'LastName', label: 'Last Name', type: 'text' },
    { name: 'Gender', label: 'Gender', type: 'text' },
    { name: 'Birthday', label: 'Date of Birth', type: 'date' },
    { name: 'Email', label: 'Email Address', type: 'email' },
    { name: 'PhoneNumber', label: 'Phone Number', type: 'tel' },
    { name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
    { name: 'Relation', label: 'Relation to Head of Household', type: 'text' },
  ];

  const goodNeighborEditFields = [
    { name: 'RefugeeFamilyID', label: 'Refugee Family', type: 'id', contextType: 'family' },
    { name: 'FamilyID', label: 'Host Family', type: 'id', contextType: 'family' }, 
    { name: 'FirstName', label: 'First Name', type: 'text' },
    { name: 'LastName', label: 'Last Name', type: 'text' },
    { name: 'Email', label: 'Email Address', type: 'email' },
    { name: 'PhoneNumber', label: 'Phone Number', type: 'tel' },
    { name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
    { name: 'Relation', label: 'Relation to Head of Household', type: 'text' },
  ];

  const goodNeighborViewFields = [
    { name: 'RefugeeFamilyID', label: 'Refugee Family', type: 'id', contextType: 'family' },
    { name: 'FamilyID', label: 'Host Family', type: 'id', contextType: 'family' }, 
    { name: 'FirstName', label: 'First Name', type: 'text' },
    { name: 'LastName', label: 'Last Name', type: 'text' },
    { name: 'Gender', label: 'Gender', type: 'text' },
    { name: 'Birthday', label: 'Date of Birth', type: 'date' },
    { name: 'Email', label: 'Email Address', type: 'email' },
    { name: 'PhoneNumber', label: 'Phone Number', type: 'tel' },
    { name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
    { name: 'Relation', label: 'Relation to Head of Household', type: 'text' },
  ];

  const goodNeighborDisplayFields = [
    { name: 'RefugeeFamilyID', label: 'Refugee Family', type: 'id', contextType: 'family' },
    { name: 'FamilyID', label: 'Host Family', type: 'id', contextType: 'family' }, 
    { name: 'FirstName', label: 'First Name', type: 'text' },
    { name: 'LastName', label: 'Last Name', type: 'text' },
    // { name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
  ]

  const GoodNeighborContext = {
    type: "neighbor",
    id: "neighbor_id",
    getAllEndpoint: "http://localhost:8080/neighbor",
    getOneEndpoint: (id) => `http://localhost:8080/neighbor/${id}`,
    create: handleCreateGoodNeighbor,
    edit: handleEditGoodNeighbor,
    delete: handleDeleteGoodNeighbor,
    createFields: goodNeighborCreateFields,
    editFields: goodNeighborEditFields,
    viewFields: goodNeighborViewFields,
    displayFields: goodNeighborDisplayFields,
    createTitle: "Add Neighbor",
    editTitle: "Edit Neighbor",
    viewTitle: "View Neighbor", //TO-DO: viewDialog should provide its own title, so we can provide the first and last family name
  };
  
  export default GoodNeighborContext;