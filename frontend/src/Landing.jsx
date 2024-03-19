import React, { useState } from 'react';
import axios from 'axios';
import Refugees from './Refugees';
import Volunteers from './Volunteers';
import Donations from './Donations';
import GoodNeighbors from './GoodNeighbors';
import Families from './Families';
import { useTheme, Flex, Button } from '@chakra-ui/react';
import theme from './style/theme';
import MapComponent from './MapComponent';

const Landing = (props) => {
    console.log('Landing rendered')
    const theme = useTheme();
    console.log('theme', theme)

    const handleLogout = () => {    
        console.log('Logout Clicked');
    
        axios.post('http://localhost:8080/auth/logout')
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
        <Flex flexDirection={'column'} width={'90vw'} height={'90vh'}>
            <Flex id='header' flex={1} justifyContent={'flex-end'} alignItems={'center'}>
              <Button bg={theme.colors.purple[800]} color={'white'} onClick={handleLogout}>
                  Logout
              </Button>
            </Flex>
            <Flex flexDirection={'row'} flex={8}>
              <Flex id='sidebar' flexDirection={'column'} flex={1}>
                  <Refugees></Refugees>
                  <Volunteers></Volunteers>
                  <Donations></Donations>
                  <GoodNeighbors></GoodNeighbors>
                  <Families></Families>
                  <MapComponent></MapComponent>
              </Flex>
              <Flex id='body' flex={5}>
                  
              </Flex>
            </Flex>


        </Flex>

    );
};

export default Landing;
