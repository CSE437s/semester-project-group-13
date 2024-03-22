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

    const handleDeleteDonation = (formData) => {
        const endpoint  = 'http://localhost:8080/donation/' + formData['donation_id'] + '/deleteOne'
        axios.delete(endpoint, formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    }

//   const {
//     item,
//     quantity,
//     completed,
//     giving_family,
//     giving_volunteer,
//     receiving_family,
//     user_id,
//   } = req.body;

const donationFields = [
    { name: 'item', label: 'Item', type: 'text' },
    { name: 'quantity', label: 'Quantity', type: 'number' },
    { name: 'completed', label: 'Completed?', type: 'number'}, //needs unique typing
    { name: 'giving_family', label: 'Given By (Family)', type: 'number' },
    { name: 'giving_volunteer', label: 'Given By (Member)', type: 'number' },
    { name: 'recieving_family', label: 'Recieved By (Family)', type: 'number' }, //in the future this shold be a search bar
    { name: 'user_id', label: 'User', type: 'number' },
];
  const donationCreateFields = [
    { name: 'item', label: 'Item', type: 'text' },
    { name: 'quantity', label: 'Quantity', type: 'number' },
    { name: 'completed', label: 'Completed?', type: 'number'}, //needs unique typing
    { name: 'giving_family', label: 'Given By (Family)', type: 'number' },
    { name: 'giving_volunteer', label: 'Given By (Member)', type: 'number' },
    { name: 'recieving_family', label: 'Recieved By (Family)', type: 'number' }, //in the future this shold be a search bar
    { name: 'user_id', label: 'User', type: 'number' },
];

  const donationEditFields = [
    { name: 'item', label: 'Item', type: 'text' },
    { name: 'quantity', label: 'Quantity', type: 'number' },
    { name: 'completed', label: 'Completed?', type: 'number'},
    { name: 'giving_family', label: 'Given By (Family)', type: 'number' },
    { name: 'giving_volunteer', label: 'Given By (Member)', type: 'number' },
    { name: 'recieving_family', label: 'Recieved By (Family)', type: 'number' }, //in the future this shold be a search bar
    { name: 'user_id', label: 'User', type: 'number' },
];

const donationViewFields = [
    { name: 'item', label: 'Item', type: 'text' },
    { name: 'quantity', label: 'Quantity', type: 'number' },
    { name: 'completed', label: 'Completed?', type: 'number'},
    { name: 'giving_family', label: 'Given By (Family)', type: 'number' },
    { name: 'giving_volunteer', label: 'Given By (Member)', type: 'number' },
    { name: 'recieving_family', label: 'Recieved By (Family)', type: 'number' }, //in the future this shold be a search bar
    { name: 'user_id', label: 'User', type: 'number' },
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
                viewTitle={"View Donation"}
                viewFields={donationViewFields}
                editFields={donationEditFields}
                onDelete={handleDeleteDonation}
            ></DynamicTable>
            <DynamicFormDialog
                    isOpen={openCreateDialog}
                    onClose={handleCloseCreateDialog}
                    onSubmit={handleCreateDonation}
                    formFields={donationCreateFields}
                    title={"Record Donation"}
                />   
        </BasicPage>
    );
};

export default Donations;
