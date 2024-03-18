import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import BasicPage from './utility/BasicPage';
import theme from './style/theme';
import { useTheme, Button } from '@chakra-ui/react';
import DynamicFormDialog from './utility/DynamicFormDialog';

const Families = (props) => {
    console.log('Families Page clicked');

    const [data, setData] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        axios.get('http://localhost:8080/family')
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

    const handleCreateFamily = (formData) => {
        axios.post('http://localhost:8080/family/create', formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };

    const familyFields = [
        { name: 'head_of_household', label: 'Head of Household', type: 'text' },
        { name: 'last_name', label: 'Last Name', type: 'text' },
        { name: 'address', label: 'Street Address', type: 'text' },
        { name: 'city', label: 'City', type: 'text' },
        { name: 'zip', label: 'Zip Code', type: 'number' },
        { name: 'family_members', label: 'Family Members', type: 'text' },
        { name: 'good_neighbor', label: 'Good Neighor', type: 'checkbox' }
      ];

    return (
        <div>
            <BasicPage
                title="Families"
            >            
                <Button bg={theme.colors.purple[300]} color={'white'} onClick={handleOpenCreateDialog}>
                    Add Family
                </Button>
                <DynamicTable data={data}></DynamicTable>
                <DynamicFormDialog
                    isOpen={openCreateDialog}
                    onClose={handleCloseCreateDialog}
                    onSubmit={handleCreateFamily}
                    formFields={familyFields}
                    title={"Add Family"}
                />
            </BasicPage>
        </div>
    );
};

export default Families;
