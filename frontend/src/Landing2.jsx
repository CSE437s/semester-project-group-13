import React, { useState } from 'react';
import Refugees from './Refugees';
import Donators from './Donators';
import GoodNeighbors from './GoodNeighbors';
import Families from './Families';
import BasicPage from './utility/BasicPage';

const Landing2 = (props) => {
    console.log('Landing rendered')
    const [currentView, setCurrentView] = useState(0);

    const updateView = (view) => {
        setCurrentView(view);
    }

    return (
        <div>
            <Refugees></Refugees>
            <Donators></Donators>
            <GoodNeighbors></GoodNeighbors>
            <Families></Families>
        </div>
    );
};

export default Landing2;
