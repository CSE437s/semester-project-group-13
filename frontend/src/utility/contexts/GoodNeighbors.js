import axios from "axios";

const handleCreateGoodNeighbor = (formData) => {
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
    const endpoint  = 'http://localhost:8080/neighbor/' + formData['good_neighbor_id'] + '/update'
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
    const endpoint  = 'http://localhost:8080/neighbor/' + formData['good_neighbor_id'] + '/deleteOne'
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
    { name: 'refugee_family_id', label: 'Refugee Family', type: 'id', contextType: 'family' }, //in the future this shold be a search bar
    { name: 'host_family_id', label: 'Host Family', type: 'id', contextType: 'family' }, //in the future this shold be a search bar
    { name: 'match_date', label: 'Date Matched', type: 'date' }, //in the future this shold be a search bar
  ];

  const goodNeighborEditFields = [
    { name: 'refugee_family_id', label: 'Refugee Family', type: 'id', contextType: 'family'}, //in the future this shold be a search bar
    { name: 'host_family_id', label: 'Host Family', type: 'id', contextType: 'family'}, //in the future this shold be a search bar
    { name: 'match_date', label: 'Date Matched', type: 'date' }, //in the future this shold be a search bar
  ];

  const goodNeighborViewFields = [
    { name: 'refugee_family_id', label: 'Refugee Family', type: 'id', contextType: 'family'}, //in the future this shold be a search bar
    { name: 'host_family_id', label: 'Host Family', type: 'id', contextType: 'family'}, //in the future this shold be a search bar
    { name: 'match_date', label: 'Date Matched', type: 'date' }, //in the future this shold be a search bar
  ];

  const GoodNeighborContext = {
    type: "good_neighbor",
    id: "good_neighbor_id",
    getAllEndpoint: "http://localhost:8080/neighbor",
    create: handleCreateGoodNeighbor,
    edit: handleEditGoodNeighbor,
    delete: handleDeleteGoodNeighbor,
    createFields: goodNeighborCreateFields,
    editFields: goodNeighborEditFields,
    viewFields: goodNeighborViewFields,
    createTitle: "Add Match",
    editTitle: "Edit Match",
    viewTitle: "View Match", //TO-DO: viewDialog should provide its own title, so we can provide the first and last family name
  };
  
  export default GoodNeighborContext;