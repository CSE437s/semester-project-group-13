import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import DynamicFormDialog from './utility/DynamicFormDialog';
import { Button } from '@chakra-ui/react';
import BasicPage from './utility/BasicPage';

const Donators = (props) => {
    console.log('Donators Page clicked');

    const [donatorData, setDonatorData] = useState([]);
    const [donationData, setDonationData] = useState([]);
    const [donatorView, setDonatorView] = useState(true);
    const [openCreateDonatorDialog, setOpenCreateDonatorDialog] = useState(false);
    const [openCreateDonationDialog, setOpenCreateDonationDialog] = useState(false);



    useEffect(() => {
        axios.get('http://localhost:8080/getAllDonators')
            .then((response) => {
                const dataFromApi = response.data.donators;
                console.log(dataFromApi);
                setDonatorData(dataFromApi);
            })
            .catch((error) => {
                console.error('Error making API call:', error);
            });

        axios.get('http://localhost:8080/getAllDonations')
            .then((response) => {
                const dataFromApi = response.data.donations;
                console.log(dataFromApi);
                setDonationData(dataFromApi);
            })
            .catch((error) => {
                console.error('Error making API call:', error);
            });
    }, []);

    const handleToggle = () => {
        setDonatorView(!donatorView)
    }

    const handleOpenCreateDonatorDialog = () => {
        setOpenCreateDonatorDialog(true);
    };

    const handleOpenCreateDonationDialog = () => {
        setOpenCreateDonationDialog(true);
    };

    const handleCloseCreateDonatorDialog = () => {
        setOpenCreateDonatorDialog(false);
    };

    const handleCloseCreateDonationDialog = () => {
        setOpenCreateDonationDialog(false);
    };

    const handleCreateDonator = (formData) => {
        axios.post('http://localhost:8080/createDonator', formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };

    const handleCreateDonation = (formData) => {
        axios.post('http://localhost:8080/createDonation', formData)
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

  const donatorFields = [
    { name: 'first_name', label: 'First Name', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text' },
    { name: 'phone_number', label: 'Phone Number', type: 'tel' },
    { name: 'address', label: 'Street Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zip', label: 'Zip Code', type: 'number' }
  ];
    
    return (
        <div>
            <BasicPage
                title="Donators"
            >
                <DynamicTable data={donatorData}></DynamicTable>
                <Button variant="outline" onClick={handleOpenCreateDonatorDialog}>
                    Add Donator
                </Button>
                <DynamicFormDialog
                        isOpen={openCreateDonatorDialog}
                        onClose={handleCloseCreateDonatorDialog}
                        onSubmit={handleCreateDonator}
                        formFields={donatorFields}
                        title={"Add Donator"}
                    />
            </BasicPage>
            <BasicPage
                title="Donations"
            >
                <DynamicTable data={donationData}></DynamicTable>
                <Button variant="outline" onClick={handleOpenCreateDonationDialog}>
                    Add Donation
                </Button>
                <DynamicFormDialog
                        isOpen={openCreateDonationDialog}
                        onClose={handleCloseCreateDonationDialog}
                        onSubmit={handleCreateDonation}
                        formFields={donationFields}
                        title={"Add Donation"}

                    />   
            </BasicPage>
        </div>
    );
};

export default Donators;
