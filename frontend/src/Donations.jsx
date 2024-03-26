import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import DynamicFormDialog from './utility/DynamicFormDialog';
import { Button, useTheme } from '@chakra-ui/react';
import BasicPage from './utility/BasicPage';
import theme from './style/theme';
import {ContextProvider} from './utility/contexts/ContextProvider';

const Donations = (props) => {
    console.log('Donators Page clicked');
    const theme = useTheme();
    const context = ContextProvider("donation");

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
    
    return (
        <BasicPage
            title="Donations"
        >
            <Button bg={theme.colors.purple[300]} color={'white'} onClick={handleOpenCreateDialog}>
                Record Donation
            </Button>
            <DynamicTable 
                data={donationData}
                context={context}
            ></DynamicTable>
            <DynamicFormDialog
                    isOpen={openCreateDialog}
                    onClose={handleCloseCreateDialog}
                    onSubmit={context.create}
                    formFields={context.createFields}
                    title={context.createTitle}
                />   
        </BasicPage>
    );
};

export default Donations;
