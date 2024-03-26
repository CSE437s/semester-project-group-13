import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import BasicPage from './utility/BasicPage';
import theme from './style/theme';
import { useTheme, Button } from '@chakra-ui/react';
import DynamicFormDialog from './utility/DynamicFormDialog';
import {ContextProvider} from './utility/contexts/ContextProvider';

const Families = (props) => {
    console.log('Families Page clicked');

    const [data, setData] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const theme = useTheme();
    const context = ContextProvider("family");

    useEffect(() => {
        axios.get(context.getAllEndpoint)
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

    return (
        <div>
            <BasicPage
                title="Families"
            >            
                <Button bg={theme.colors.purple[300]} color={'white'} onClick={handleOpenCreateDialog}>
                    Add Family
                </Button>
                <DynamicTable 
                    data={data}
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
        </div>
    );
};

export default Families;
