import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import BasicPage from './utility/BasicPage';

const Families = (props) => {
    console.log('Families Page clicked');

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/getAllFamilies')
            .then((response) => {
                const dataFromApi = response.data.families;
                console.log(dataFromApi);
                setData(dataFromApi);
            })
            .catch((error) => {
                console.error('Error making API call:', error);
            });
    }, []);

    return (
        <div>
            <BasicPage
                title="Families"
            >
                <DynamicTable data={data}></DynamicTable>
            </BasicPage>

        </div>
    );
};

export default Families;
