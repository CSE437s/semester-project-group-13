import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import BasicPage from './utility/BasicPage';
import theme from './style/theme';
import { useTheme, Button, Spacer } from '@chakra-ui/react';
import DynamicFormDialog from './utility/DynamicFormDialog';
import {ContextProvider} from './utility/contexts/ContextProvider';

const GoodNeighbors = (props) => {
    console.log('Good Neighbors Page clicked');

    const [data, setData] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const theme = useTheme();
    const context = ContextProvider("goodNeighbor")

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

    return (
        <div>
            <BasicPage
                title="Good Neighbors"
            >
                <Button variant={"solid"} onClick={handleOpenCreateDialog}>
                    Add Good Neighbor
                </Button>
                <Spacer height={'5vh'}/>
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

export default GoodNeighbors;
