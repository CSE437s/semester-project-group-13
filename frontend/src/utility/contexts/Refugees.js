import axios from "axios";

//this logic should be handled by the family page in the future
const handleCreateRefugee = (formData) => {
  formData['is_deleted'] = 0;
  axios
    .post("http://localhost:8080/refugee/create", formData)
    .then((response) => {
      const data = response.data;
      console.log("Form data submitted:", formData);
    })
    .catch((error) => {
      if (error.s) console.error("Error submitting form:", error);
    });
};

const handleEditRefugee = (formData) => {
  const endpoint =
    "http://localhost:8080/refugee/" + formData["refugee_id"] + "/update";
  axios
    .put(endpoint, formData)
    .then((response) => {
      const data = response.data;
      console.log("Form data submitted:", formData);
    })
    .catch((error) => {
      if (error.s) console.error("Error submitting form:", error);
    });
};

const handleDeleteRefugee = (formData) => {
  const endpoint =
    "http://localhost:8080/refugee/" + formData["refugee_id"] + "/deleteOne";
  axios
    .delete(endpoint)
    .then((response) => {
      const data = response.data;
      console.log("Form data submitted:", data);
    })
    .catch((error) => {
      if (error.s) console.error("Error submitting form:", error);
    });
};

const refugeeCreateFields = [
  { name: "first_name", label: "First Name", type: "text" },
  { name: "last_name", label: "Last Name", type: "text" },
  { name: "family_id", label: "Family", type: "id", contextType: "family" },
  { name: "gender", label: "Gender", type: "text" },
  { name: "birthday", label: "Date of Birth", type: "date" },
  { name: 'phone', label: 'Phone Number', type: 'tel' },
  { name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
  { name: 'relation_to_head', label: 'Relation to Head of Household', type: 'text' },
];

const refugeeEditFields = [
  { name: "first_name", label: "First Name", type: "text" },
  { name: "last_name", label: "Last Name", type: "text" },
  { name: 'phone', label: 'Phone Number', type: 'tel' },
  { name: "family_id", label: "Family", type: "id", contextType: "family" },
  { name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
  { name: 'relation_to_head', label: 'Relation to Head of Household', type: 'text' },
];

const refugeeViewFields = [
  { name: "first_name", label: "First Name", type: "text" },
  { name: "last_name", label: "Last Name", type: "text" },
  { name: "family_id", label: "Family", type: "id", contextType: "family" },
  { name: "gender", label: "Gender", type: "text" },
  { name: "birthday", label: "Date of Birth", type: "date" },
  { name: 'phone', label: 'Phone Number', type: 'tel' },
  { name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
  { name: 'relation_to_head', label: 'Relation to Head of Household', type: 'text' },
];

const refugeeDisplayFields = [
  { name: "family_id", label: "Family", type: "id", contextType: "family" },
  { name: "first_name", label: "First Name", type: "text" },
  { name: 'phone', label: 'Phone Number', type: 'tel' },
  { name: 'is_head_of_house', label: 'Head of Household', type: 'bool'},
];

const RefugeeContext = {
  type: "refugee",
  id: "refugee_id",
  getAllEndpoint: "http://localhost:8080/refugee",
  getOneEndpoint: (id) => `http://localhost:8080/refugee/${id}`,
  create: handleCreateRefugee,
  edit: handleEditRefugee,
  delete: handleDeleteRefugee,
  createFields: refugeeCreateFields,
  editFields: refugeeEditFields,
  viewFields: refugeeViewFields,
  displayFields: refugeeDisplayFields,
  createTitle: "Add Refugee",
  editTitle: "Edit Refugee",
  viewTitle: "View Refugee", //TO-DO: viewDialog should provide its own title, so we can provide the first and last refugee name
};

export default RefugeeContext;
