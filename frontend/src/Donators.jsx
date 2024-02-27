import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import DynamicFormDialog from './utility/DynamicFormDialog';
import { Button, useTheme } from '@chakra-ui/react';
import BasicPage from './utility/BasicPage';
import theme from './style/theme';


const Donators = (props) => {
    console.log('Donators Page clicked');
    const theme = useTheme();

    const [donatorData, setDonatorData] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    useEffect(() => {
        axios.get('https://semester-project-group-13-backend.vercel.app/getAllDonators')
            .then((response) => {
                const dataFromApi = response.data.donators;
                console.log(dataFromApi);
                setDonatorData(dataFromApi);
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

    const handleCreateDonator = (formData) => {
        axios.post('https://semester-project-group-13-backend.vercel.app/createDonator', formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };

  const donatorFields = [
    { name: 'first_name', label: 'First Name', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text' },
    { name: 'phone_number', label: 'Phone Number', type: 'tel' },
    { name: 'address', label: 'Street Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zip', label: 'Zip Code', type: 'number' }
  ];
    
    return (
        <BasicPage
            title="Donators"
        >
            <Button bg={theme.colors.purple[300]} color={'white'} onClick={handleOpenCreateDialog}>
                Add Donator
            </Button>
            <DynamicTable data={donatorData}></DynamicTable>
            <DynamicFormDialog
                    isOpen={openCreateDialog}
                    onClose={handleCloseCreateDialog}
                    onSubmit={handleCreateDonator}
                    formFields={donatorFields}
                    title={"Add Donator"}
                />
        </BasicPage>
    );
};

export default Donators;
