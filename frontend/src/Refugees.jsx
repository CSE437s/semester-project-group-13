import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import BasicPage from './utility/BasicPage';
import DynamicFormDialog from './utility/DynamicFormDialog';
import theme from './style/theme';
import { Button, useTheme } from '@chakra-ui/react';

const Refugees = (props) => {
    console.log('Refugee Page clicked');

    const [data, setData] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        axios.get('http://localhost:8080/refugee')
            .then((response) => {
                const dataFromApi = response.data.data;
                console.log(dataFromApi);
                setData(dataFromApi);
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

    //this logic should be handled by the family page in the future
    const handleCreateRefugee = (formData) => {
        axios.post('http://localhost:8080/refugee/create', formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };

    const handleEditRefugee = (formData) => {
        const endpoint  = 'http://localhost:8080/refugee/:' + formData['refugee_id'] + '/update'
        axios.post(endpoint, formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };

    const handleDeleteRefugee = (formData) => {
        const endpoint  = 'http://localhost:8080/refugee/' + formData['refugee_id'] + '/deleteOne'
        axios.post(endpoint)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', data);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    }
    
    const refugeeFields = [
    { name: 'first_name', label: 'First Name', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text' },
    { name: 'country_of_origin', label: 'Country of Origin', type: 'text' },
    { name: 'gender', label: 'Gender', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone_number', label: 'Phone Number', type: 'tel' },
    { name: 'date_of_birth', label: 'Date of Birth', type: 'date' },
    { name: 'date_of_arrival_to_us', label: 'Date of Arrival [to US]', type: 'date' },
    { name: 'date_of_joining_oasis', label: 'Date of Arrival [to Oasis]', type: 'date' },
    { name: 'family_id', label: 'Family', type: 'number' },

    ];

    return (
        <div>
            <BasicPage
                title="Refugees"
            >
                <Button bg={theme.colors.purple[300]} color={'white'} onClick={handleOpenCreateDialog}>
                    Add Refugee
                </Button>
                <DynamicTable 
                    data={data}
                    onEdit={handleEditRefugee}
                    editTitle={"Edit Refugee"}
                    editFields={refugeeFields}
                    onDelete={handleDeleteRefugee}
                ></DynamicTable>
                <DynamicFormDialog
                    isOpen={openCreateDialog}
                    onClose={handleCloseCreateDialog}
                    onSubmit={handleCreateRefugee}
                    formFields={refugeeFields}
                    title={"Add Refugee"}
                />
            </BasicPage>

        </div>
    );
};

export default Refugees;
