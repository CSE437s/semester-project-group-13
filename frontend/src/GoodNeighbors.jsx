import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';

const GoodNeighbors = (props) => {
    console.log('Good Neighbors Page clicked');

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8080/getAllGoodNeighbors')
            .then((response) => {
                const dataFromApi = response.goodNeighbors;
                console.log(dataFromApi);
                setData(dataFromApi);
            })
            .catch((error) => {
                console.error('Error making API call:', error);
            });
    }, []);

    return (
        <div>
            <button onClick={() => props.onPageClose()}>Home</button>
            <h2>Good Neighbors</h2>
            <DynamicTable data={data}></DynamicTable>
        </div>
    );
};

export default GoodNeighbors;
