import React, { useState } from 'react';
import axios from 'axios';
import Refugees from './Refugees';
import Donators from './Donators';
import Donations from './Donations';
import GoodNeighbors from './GoodNeighbors';
import Families from './Families';
import { useTheme, Flex, Button } from '@chakra-ui/react';
import theme from './style/theme';

const Landing = (props) => {
    console.log('Landing rendered')
    const theme = useTheme();
    console.log('theme', theme)

    const handleLogout = () => {    
        console.log('Logout Clicked');
    
        axios.post('https://semester-project-group-13-backend.vercel.app/logout')
          .then((response) => {
            const data = response.data;
            console.log(data);
            props.onLogout();
          })
          .catch((error) => {
            console.error('Error making API call:', error);
          });
      };

    return (
        <div>
            <Button bg={theme.colors.purple[800]} color={'white'} onClick={handleLogout}>
                Logout
            </Button>
            <Flex>
                <Refugees></Refugees>
                <Donators></Donators>
                <Donations></Donations>
                <GoodNeighbors></GoodNeighbors>
                <Families></Families>
            </Flex>
        </div>

    );
};

export default Landing;
