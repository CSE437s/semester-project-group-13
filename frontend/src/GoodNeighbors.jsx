import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';
import BasicPage from './utility/BasicPage';

const GoodNeighbors = (props) => {
    console.log('Good Neighbors Page clicked');

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/getAllGoodNeighbors')
            .then((response) => {
                const dataFromApi = response.data.goodNeighbors;
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
                title="Good Neighbors"
            >
                <DynamicTable data={data}></DynamicTable>
            </BasicPage>
        </div>
    );
};

export default GoodNeighbors;
