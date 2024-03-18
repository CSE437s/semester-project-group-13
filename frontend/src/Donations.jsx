import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import DynamicFormDialog from './utility/DynamicFormDialog';
import { Button, useTheme } from '@chakra-ui/react';
import BasicPage from './utility/BasicPage';
import theme from './style/theme';


const Donations = (props) => {
    console.log('Donators Page clicked');
    const theme = useTheme();

    const [donationData, setDonationData] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/donation')
            .then((response) => {
                const dataFromApi = response.data.data;
                console.log(dataFromApi);
                setDonationData(dataFromApi);
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

    const handleCreateDonation = (formData) => {
        axios.post('http://localhost:8080/donation/create', formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };

  const donationFields = [
    { name: 'item', label: 'Item', type: 'text' },
    { name: 'quantity', label: 'Quantity', type: 'number' },
    { name: 'donator_id', label: 'Donator ID', type: 'number' } //in the future this shold be a search bar
  ];
    
    return (
        <BasicPage
            title="Donations"
        >
            <Button bg={theme.colors.purple[300]} color={'white'} onClick={handleOpenCreateDialog}>
                Record Donation
            </Button>
            <DynamicTable data={donationData}></DynamicTable>
            <DynamicFormDialog
                    isOpen={openCreateDialog}
                    onClose={handleCloseCreateDialog}
                    onSubmit={handleCreateDonation}
                    formFields={donationFields}
                    title={"Record Donation"}

                />   
        </BasicPage>
    );
};

export default Donations;
