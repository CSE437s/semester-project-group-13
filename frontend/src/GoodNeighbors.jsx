import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import BasicPage from './utility/BasicPage';
import theme from './style/theme';
import { useTheme, Button } from '@chakra-ui/react';
import DynamicFormDialog from './utility/DynamicFormDialog';

const GoodNeighbors = (props) => {
    console.log('Good Neighbors Page clicked');

    const [data, setData] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        axios.get('http://localhost:8080/neighbor')
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

    const handleCreateGoodNeighbor = (formData) => {
        axios.post('http://localhost:8080/neighbor/create', formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };

    const handleEditGoodNeighbor = (formData) => {
        const endpoint  = 'http://localhost:8080/neighbor/' + formData['good_neighbor_id'] + '/update'
        axios.post(endpoint, formData)
        .then((response) => {
            const data = response.data;
            console.log('Form data submitted:', formData);
        }).catch((error) => {
            if(error.s)
            console.error('Error submitting form:', error);
        });
    };

    const goodNeighborFields = [
        { name: 'first_name', label: 'First Name', type: 'text' },
        { name: 'last_name', label: 'Last Name', type: 'text' },
        { name: 'phone_number', label: 'Phone Number', type: 'tel' },
        { name: 'refugee_family_id', label: 'Refugee Family ID', type: 'number' }, //in the future this shold be a search bar
        { name: 'church_they_attend', label: 'Church Home', type: 'text' }
      ];

    return (
        <div>
            <BasicPage
                title="Good Neighbors"
            >
                <Button bg={theme.colors.purple[300]} color={'white'} onClick={handleOpenCreateDialog}>
                    Add Good Neighbor
                </Button>
                <DynamicTable 
                    data={data}
                    onEdit={handleEditGoodNeighbor}
                    editTitle={"Edit Good Neighbor"}
                    editFields={goodNeighborFields}
                ></DynamicTable>
                <DynamicFormDialog
                    isOpen={openCreateDialog}
                    onClose={handleCloseCreateDialog}
                    onSubmit={handleCreateGoodNeighbor}
                    formFields={goodNeighborFields}
                    title={"Add Good Neighbor"}
                />
            </BasicPage>
        </div>
    );
};

export default GoodNeighbors;
