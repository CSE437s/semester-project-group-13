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

    const handleEditDonation = (formData) => {
        const endpoint  = 'http://localhost:8080/donation/' + formData['donation_id'] + '/update'
        axios.post(endpoint, formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };

  //  ITEM	QUANTITY	COMPLETED?	GIVING_FAMILY	GIVING_VOLUNTEER	RECEIVING_FAMILY	RECEIVING_REFUGEE

  const donationFields = [
    { name: 'item', label: 'Item', type: 'text' },
    { name: 'quantity', label: 'Quantity', type: 'number' },
    { name: 'completed', label: 'Completed?', type: 'number'},
    { name: 'giving_family', label: 'Given By (Family)', type: 'number' },
    { name: 'giving_volunteer', label: 'Given By (Member)', type: 'number' },
    { name: 'recieving_family', label: 'Recieved By (Family)', type: 'number' },
    { name: 'recieving_refugee', label: 'Recieved By (Member)', type: 'number' } //in the future this shold be a search bar
  ];
    
    return (
        <BasicPage
            title="Donations"
        >
            <Button bg={theme.colors.purple[300]} color={'white'} onClick={handleOpenCreateDialog}>
                Record Donation
            </Button>
            <DynamicTable 
                data={donationData}
                onEdit={handleEditDonation}
                editTitle={"Edit Donation"}
                editFields={donationFields}
            ></DynamicTable>
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
