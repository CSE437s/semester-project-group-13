import React, { useState } from 'react';
import Refugees from './Refugees';
import Donators from './Donators';
import Donations from './Donations';
import GoodNeighbors from './GoodNeighbors';
import Families from './Families';
import { useTheme, Flex } from '@chakra-ui/react';
import theme from './style/theme';

const Landing = (props) => {
    console.log('Landing rendered')
    const theme = useTheme();
    console.log('theme', theme)

    return (
        <Flex>
            <Refugees></Refugees>
            <Donators></Donators>
            <Donations></Donations>
            <GoodNeighbors></GoodNeighbors>
            <Families></Families>
        </Flex>
    );
};

export default Landing;
