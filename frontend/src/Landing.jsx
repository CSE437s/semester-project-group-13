import React, { useState } from 'react';
import Refugees from './Refugees';
import Donators from './Donators';
import GoodNeighbors from './GoodNeighbors';
import Families from './Families';

const Landing = (props) => {
    console.log('Landing rendered')
    const [currentView, setCurrentView] = useState(0);

    const updateView = (view) => {
        setCurrentView(view);
    }

    return (
        <div>
        { (() => {
          switch(currentView) {
            case 0:
            case 'default':
                return(
                    <div>
                        <button onClick={() => updateView(1)}>Refugees</button>
                        <button onClick={() => updateView(2)}>Donations</button>
                        <button onClick={() => updateView(3)}>Good Neighbors</button>
                        <button onClick={() => updateView(4)}>Families</button>
                    </div>
                )
            case 1:
                return(
                    <Refugees onPageClose={() => updateView(0)}></Refugees>
                )
            case 2:
                return(
                    <Donators onPageClose={() => updateView(0)}></Donators>
                )
            case 3:
                return(
                    <GoodNeighbors onPageClose={() => updateView(0)}></GoodNeighbors>
                )
            case 4:
                return(
                    <Families onPageClose={() => updateView(0)}></Families>
                )
          }
        })()}
        </div>
    );
};

export default Landing;
