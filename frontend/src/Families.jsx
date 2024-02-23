import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';

const Families = (props) => {
    console.log('Families Page clicked');

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8080/getAllFamilies')
            .then((response) => {
                const dataFromApi = response.families;
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
            <h2>Families</h2>
            <DynamicTable data={data}></DynamicTable>
        </div>
    );
};

export default Families;
