import axios from "axios";

const handleCreateFamily = (formData) => {
  formData['EnteredBy'] = "";
  formData['Scheduled'] = "";
  formData['is_deleted'] = 0;

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
    { name: 'FamilyName', label: 'Family Name', type: 'text' },
    { name: 'address', label: 'Street Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zip_code', label: 'Zip Code', type: 'number' },
    { name: "CountryOfOrigin", label: "Country of Origin", type: "text" },
    {
        name: "ArrivalDate",
        label: "Date of Arrival [to US]",
        type: "date",
      },
      {
        name: "DateCreated",
        label: "Date of Arrival [to Oasis]",
        type: "date",
      },
      {
        name: "LatestDateAtOasis",
        label: "Most Recent Visit",
        type: "date",
      },
    { name: "Languages", label: "Language(s)", type: "text" },
    { name: 'IsRefugeeFamily', label: 'Refugee Family?', type: 'bool' },
    { name: 'IsGoodNeighbor', label: 'Is Good Neighbor?', type: 'bool' },
    { name: 'IsOpenToHaveGoodNeighbor', label: 'Open to Have Good Neighbor', type: 'bool' },
    { name: 'DesiresToBeGoodNeighbor', label: 'Desires to be Good Neighbor', type: 'bool' },
    { name: 'user_id', label: 'User', type: 'id', contextType: 'user'},
  ];

  const familyEditFields = [
    { name: 'FamilyName', label: 'Family Name', type: 'text' },
    { name: 'address', label: 'Street Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zip_code', label: 'Zip Code', type: 'number' },
    { name: "Languages", label: "Language(s)", type: "text" },
    { name: 'IsRefugeeFamily', label: 'Refugee Family?', type: 'bool' },
    { name: 'IsGoodNeighbor', label: 'Is Good Neighbor?', type: 'bool' },
    { name: 'IsOpenToHaveGoodNeighbor', label: 'Open to Have Good Neighbor', type: 'bool' },
    { name: 'DesiresToBeGoodNeighbor', label: 'Desires to be Good Neighbor', type: 'bool' },
  ];

  const familyViewFields = [
    { name: 'FamilyName', label: 'Family Name', type: 'text' },
    { name: 'address', label: 'Street Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zip_code', label: 'Zip Code', type: 'number' },
    { name: "CountryOfOrigin", label: "Country of Origin", type: "text" },
    {
        name: "ArrivalDate",
        label: "Date of Arrival [to US]",
        type: "date",
      },
      {
        name: "DateCreated",
        label: "Date of Arrival [to Oasis]",
        type: "date",
      },
      {
        name: "LatestDateAtOasis",
        label: "Most Recent Visit",
        type: "date",
      },
    { name: "Languages", label: "Language(s)", type: "text" },
    { name: 'IsRefugeeFamily', label: 'Refugee Family?', type: 'bool' },
    { name: 'IsGoodNeighbor', label: 'Is Good Neighbor?', type: 'bool' },
    { name: 'IsOpenToHaveGoodNeighbor', label: 'Open to Have Good Neighbor', type: 'bool' },
    { name: 'DesiresToBeGoodNeighbor', label: 'Desires to be Good Neighbor', type: 'bool' },
    { name: 'user_id', label: 'Entered By', type: 'id', contextType: 'user'},
  ]

  const familyDisplayFields = [
    { name: 'FamilyName', label: 'Family Name', type: 'text' },
    { name: 'address', label: 'Street Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    {
        name: "LatestDateAtOasis",
        label: "Most Recent Visit",
        type: "date",
      },
  ];

  const FamilyContext = {
    type: "family",
    id: "family_id",
    getAllEndpoint: "http://localhost:8080/family",
    getSomeEndpoint: "http://localhost:8080/family/some",
    getOneEndpoint: (id) => `http://localhost:8080/family/${id}`,
    create: handleCreateFamily,
    edit: handleEditFamily,
    delete: handleDeleteFamily,
    createFields: familyCreateFields,
    editFields: familyEditFields,
    viewFields: familyViewFields,
    displayFields: familyDisplayFields,
    createTitle: "Add Family",
    editTitle: "Edit Family",
    viewTitle: "View Family", //TO-DO: viewDialog should provide its own title, so we can provide the first and last family name
  };
  
  export default FamilyContext;
