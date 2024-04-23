import axios from "axios";

const handleCreateRequest = (formData) => {
    formData['is_deleted'] = 0;
    formData['completed'] = 0;

    axios.post('http://localhost:8080/requests/create', formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleEditRequest = (formData) => {
    const endpoint  = 'http://localhost:8080/requests/' + formData['request_id'] + '/update'
    axios.put(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleDeleteRequest = (formData) => {
    const endpoint  = 'http://localhost:8080/requests/' + formData['request_id'] + '/deleteOne'
    axios.delete(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
}

const requestCreateFields = [
{ name: 'item', label: 'Item', type: 'text' },
{ name: 'amount', label: 'Amount', type: 'number' },
// { name: 'completed', label: 'Completed?', type: 'bool'},
{ name: 'date', label: 'Date of Request', type: 'date' },
{ name: 'family_id', label: 'Requested By', type: 'id', contextType: "family"},
{ name: 'user_id', label: 'User', type: 'id', contextType: 'user', ignore: true},
];

const requestEditFields = [
{ name: 'item', label: 'Item', type: 'text' },
{ name: 'amount', label: 'Amount', type: 'number' },
{ name: 'completed', label: 'Completed?', type: 'bool'},
];

const requestViewFields = [
{ name: 'item', label: 'Item', type: 'text' },
{ name: 'amount', label: 'Amount', type: 'number' },
{ name: 'completed', label: 'Completed?', type: 'bool'},
{ name: 'family_id', label: 'Requested By', type: 'id', contextType: "family"},
{ name: 'user_id', label: 'Entered By', type: 'id', contextType: 'user'},
];

const requestDisplayFields = [
    { name: 'item', label: 'Item', type: 'text' },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'completed', label: 'Completed?', type: 'bool'},
]

const RequestContext = {
    type: "request",
    id: "request_id",
    getAllEndpoint: "http://localhost:8080/requests",
    getSomeEndpoint: "http://localhost:8080/requests/getPending",
    getOneEndpoint: (id) => `http://localhost:8080/requests/${id}`,
    create: handleCreateRequest,
    edit: handleEditRequest,
    delete: handleDeleteRequest,
    createFields: requestCreateFields,
    editFields: requestEditFields,
    viewFields: requestViewFields,
    displayFields: requestDisplayFields,
    createTitle: "Add Request",
    editTitle: "Edit Request",
    viewTitle: "View Request", //TO-DO: viewDialog should provide its own title, so we can provide the first and last family name
  };
  
  export default RequestContext;