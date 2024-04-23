import axios from "axios";

const handleCreateNote = (formData) => {
    formData['is_deleted'] = 0;
    axios.post('http://localhost:8080/notes/create', formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleEditNote = (formData) => {
    const endpoint  = 'http://localhost:8080/notes/' + formData['note_id'] + '/update'
    axios.put(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
};

const handleDeleteNote = (formData) => {
    const endpoint  = 'http://localhost:8080/notes/' + formData['note_id'] + '/deleteOne'
    axios.delete(endpoint, formData)
    .then((response) => {
        const data = response.data;
        console.log('Form data submitted:', formData);
    }).catch((error) => {
        if(error.s)
        console.error('Error submitting form:', error);
    });
}

const noteCreateFields = [
{ name: 'type', label: 'Topic', type: 'text' },
{ name: 'date', label: 'Date Entered', type: 'date' },
{ name: 'description', label: 'Description', type: 'text' },
{ name: 'refugee_id', label: 'Refugee', type: 'id', contextType: "refugee", ignore: true},
{ name: 'donator_id', label: 'Donator', type: 'id', contextType: "family", ignore: true},
{ name: 'family_id', label: 'Family', type: 'id', contextType: "family", ignore: true},
{ name: 'user_id', label: 'User', type: 'id', contextType: 'user', ignore: true},
];

const noteEditFields = [
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'type', label: 'Topic', type: 'text' },
];

const noteViewFields = [
    { name: 'type', label: 'Topic', type: 'text' },
    { name: 'date', label: 'Date Entered', type: 'date' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'refugee_id', label: 'Given By', type: 'id', contextType: "refugee"},
    { name: 'donator_id', label: 'Given By', type: 'id', contextType: "family"},
    { name: 'family_id', label: 'Given By', type: 'id', contextType: "family"},
];

const noteDisplayFields = [
    { name: 'type', label: 'Topic', type: 'text' },
    { name: 'date', label: 'Date Entered', type: 'date' },
    { name: 'description', label: 'Description', type: 'text' },
]

const NoteContext = {
    type: "note",
    id: "note_id",
    getAllEndpoint: "http://localhost:8080/notes",
    getSomeEndpoint: "http://localhost:8080/notes/some",
    getOneEndpoint: (id) => `http://localhost:8080/notes/${id}`,
    create: handleCreateNote,
    edit: handleEditNote,
    delete: handleDeleteNote,
    createFields: noteCreateFields,
    editFields: noteEditFields,
    viewFields: noteViewFields,
    displayFields: noteDisplayFields,
    createTitle: "Add Note",
    editTitle: "Edit Note",
    viewTitle: "View Note", //TO-DO: viewDialog should provide its own title, so we can provide the first and last family name
  };
  
  export default NoteContext;