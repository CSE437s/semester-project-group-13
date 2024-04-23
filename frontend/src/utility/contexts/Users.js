import axios from "axios";

const handleCreateUser = (formData) => {
    
    axios.post('http://localhost:8080/user/create', formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleEditUser = (formData) => {
    const endpoint  = 'http://localhost:8080/user/' + formData['user_id'] + '/update'
    axios.put(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleDeleteUser = (formData) => {
    const endpoint  = 'http://localhost:8080/user/' + formData['user_id'] + '/deleteOne'
    axios.delete(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
}

const userCreateFields = [
{ name: 'username', label: 'Username', type: 'text' },
{ name: 'password', label: 'Password', type: 'text' },
{ name: 'email', label: 'Email Address', type: 'email'},
{ name: 'first_name', label: 'First Name', type: 'text'},
{ name: 'last_name', label: 'Last Name', type: 'text'}
];

const userEditFields = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'email'},
    { name: 'first_name', label: 'First Name', type: 'text'},
{ name: 'last_name', label: 'Last Name', type: 'text'}
];

const userViewFields = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'email'},
    { name: 'first_name', label: 'First Name', type: 'text'},
    { name: 'last_name', label: 'Last Name', type: 'text'}
];

const userDisplayFields = [
    { name: 'first_name', label: 'First Name', type: 'text'},
    { name: 'last_name', label: 'Last Name', type: 'text'},
    { name: 'email', label: 'Email Address', type: 'email'},
]

const UserContext = {
    type: "user",
    id: "user_id",
    getAllEndpoint: "http://localhost:8080/user",
    getSomeEndpoint: "http://localhost:8080/user/some",
    getOneEndpoint: (id) => `http://localhost:8080/user/${id}`,
    create: handleCreateUser,
    edit: handleEditUser,
    delete: handleDeleteUser,
    createFields: userCreateFields,
    editFields: userEditFields,
    viewFields: userViewFields,
    displayFields: userDisplayFields,
    createTitle: "Add User",
    editTitle: "Edit User",
    viewTitle: "View User", //TO-DO: viewDialog should provide its own title, so we can provide the first and last family name
  };
  
  export default UserContext;