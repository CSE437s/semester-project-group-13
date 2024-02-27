import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, useTheme} from '@chakra-ui/react';
import theme from './style/theme';
import axios from 'axios';

const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log('Login clicked');
    console.log('Username:', username);
    console.log('Password:', password);

    const credentials = { username: username, password: password };
    axios.post('http://localhost:8080/getUser', credentials)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setUsername(data.username);
        setPassword(data.password);
        props.onLogin();
      })
      .catch((error) => {
        console.error('Error making API call:', error);
      });
  };

  return (
    <Box maxW="sm" mx="auto" mt={8}>
      <Heading mb={4}>Login</Heading>
      <form onSubmit={handleLogin}>
        <FormControl mb={4}>
          <FormLabel>Username:</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" bg={theme.colors.purple[500]} mr={3}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
