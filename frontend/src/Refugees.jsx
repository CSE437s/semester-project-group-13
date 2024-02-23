import React, { useState, useEffect } from 'react';
import DynamicTable from './utility/DynamicTable';
import axios from 'axios';

const Refugees = (props) => {
    console.log('Refugee Page clicked');

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/getAllRefugee')
            .then((response) => {
                const dataFromApi = response.data.refugees;
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
            <h2>Refugee Families</h2>
            <DynamicTable data={data}></DynamicTable>
        </div>
    );
};

export default Refugees;
