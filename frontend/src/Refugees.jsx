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
        axios.get('https://semester-project-group-13-backend.vercel.app/getAllRefugees')
            .then((response) => {
                const dataFromApi = response.data.refugees;
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
        axios.post('https://semester-project-group-13-backend.vercel.app/createRefugee', formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };
    
    const refugeeFields = [
    { name: 'first_name', label: 'First Name', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text' },
    { name: 'country_of_origin', label: 'Country of Origin', type: 'text' },
    { name: 'gender', label: 'Gender', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'date_of_birth', label: 'Date of Birth', type: 'date' },
    { name: 'date_of_arrival_to_us', label: 'Date of Arrival [to US]', type: 'date' },
    { name: 'date_of_joining_oasis', label: 'Date of Arrival [to Oasis]', type: 'date' },
    { name: 'country_of_origin', label: 'Country of Origin', type: 'text' }
    ];

    return (
        <div>
            <BasicPage
                title="Refugees"
            >
                <Button bg={theme.colors.purple[300]} color={'white'} onClick={handleOpenCreateDialog}>
                    Add Refugee
                </Button>
                <DynamicTable data={data}></DynamicTable>
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
