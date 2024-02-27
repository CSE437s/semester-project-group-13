//App.js
import axios from 'axios';
import './App.css';
import React, { useState } from 'react';
import Login from './Login'
import Landing from './Landing';
import Landing2 from './Landing2';
import theme from './style/theme';
import { ChakraProvider } from '@chakra-ui/react';



function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const apiCallTest = () => {
    
    axios.get('http://localhost:8080').then((response) => {
      const data = response.data;
      console.log(data);
    }).catch((error) => {
      console.error('Error making API call:', error);
    });
  };
  
  const apiCallDataBase = () => {
    const credentials = { username: 'guest', password: 'password' };
    axios.post('http://localhost:8080/getUser', credentials)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setUsername(data.username);
        setPassword(data.password);
    }).catch((error) => {
      console.error('Error making API call:', error);
    });
  };
  
  const showCurrentUserNameAndPassword = () => {
    console.log('Current User:', username);
    console.log('Current Password:', password);
  };


  const handleSuccessfulLogin = () => {
    setLoggedIn(true);
  };

  return (
    <ChakraProvider theme={theme}>
      <div>
          <div className="App">
          <header className="App-header">
        {loggedIn ? (
            <Landing2></Landing2>
            // <Donators></Donators>
            // <button onClick={apiCallTest}>Make API Call</button>
            // <button onClick={apiCallDataBase}>Get Database</button>
            // <button onClick={showCurrentUserNameAndPassword}>
            //   Show Current User and Password
            // </button>
        ) : (
          <Login onLogin={handleSuccessfulLogin} />
        )}
        </header>
        </div>
      </div>
    </ChakraProvider>

  );
};

export default App;