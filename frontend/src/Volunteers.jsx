import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import DynamicFormDialog from './utility/DynamicFormDialog';
import { Button, useTheme } from '@chakra-ui/react';
import BasicPage from './utility/BasicPage';
import theme from './style/theme';


const Volunteers = (props) => {
    console.log('Volunteers Page clicked');
    const theme = useTheme();

    const [volunteerData, setVolunteerData] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/volunteer')
            .then((response) => {
                const dataFromApi = response.data.data;
                console.log(dataFromApi);
                setVolunteerData(dataFromApi);
            })
            .catch((error) => {
                console.error('Error making API call:', error);
            });
    }, []);

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
    };

    const handleCreateVolunteer = (formData) => {
        axios.post('http://localhost:8080/volunteer/create', formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };

    const handleEditVolunteer = (formData) => {
        const endpoint  = 'http://localhost:8080/volunteer/' + formData['volunteer_id'] + '/update'
        axios.post(endpoint, formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };

  const volunteerFields = [
    { name: 'first_name', label: 'First Name', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text' },
    { name: 'date_of_birth', label: 'Date of Birth', type: 'date' },
    { name: 'phone_number', label: 'Phone Number', type: 'tel' },
    // { name: 'address', label: 'Street Address', type: 'text' },
    // { name: 'city', label: 'City', type: 'text' },
    // { name: 'zip', label: 'Zip Code', type: 'number' }
  ];
    
    return (
        <BasicPage
            title="Volunteers"
        >
            <Button bg={theme.colors.purple[300]} color={'white'} onClick={handleOpenCreateDialog}>
                Add Volunteer
            </Button>
            <DynamicTable 
                data={volunteerData}
                onEdit={handleEditVolunteer}
                editTitle={"Edit Volunteer"}
                editFields={volunteerFields}
            ></DynamicTable>
            <DynamicFormDialog
                    isOpen={openCreateDialog}
                    onClose={handleCloseCreateDialog}
                    onSubmit={handleCreateVolunteer}
                    formFields={volunteerFields}
                    title={"Add Volunteer"}
                />
        </BasicPage>
    );
};

export default Volunteers;
