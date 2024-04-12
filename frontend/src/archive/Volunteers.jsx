import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import DynamicFormDialog from './utility/DynamicFormDialog';
import { Button, useTheme, Spacer} from '@chakra-ui/react';
import BasicPage from './utility/BasicPage';
import theme from '../style/theme';
import { ContextProvider } from '../utility/contexts/ContextProvider';


const Volunteers = (props) => {
    console.log('Volunteers Page clicked');
    const theme = useTheme();
    const context = ContextProvider('volunteer')

    const [volunteerData, setVolunteerData] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/volunteer')
            .then((response) => {
                const dataFromApi = response.data.data;
                console.log(dataFromApi);
                setVolunteerData(dataFromApi);
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
            title="Volunteers"
        >
            <Button variant={'solid'} onClick={handleOpenCreateDialog}>
                Add Volunteer
            </Button>
            <Spacer height={'5vh'}/>
            <DynamicTable 
                data={volunteerData}
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

export default Volunteers;
