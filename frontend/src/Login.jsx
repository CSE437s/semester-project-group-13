import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, Heading, useTheme, Alert, AlertIcon, AlertTitle, CloseButton, Flex } from '@chakra-ui/react'
import theme from './style/theme'
import axios from 'axios'
import LoadingPage from './utility/LoadingPage'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginAlert, setLoginAlert] = useState(false)

  const theme = useTheme()

  const handleLogin = (e) => {
    e.preventDefault()

    console.log('Login clicked')
    console.log('Username:', username)
    console.log('Password:', password)

    const credentials = { username, password } // we should hash the password before sending it (it should be hashed on registration)
    axios.post('http://localhost:8080/auth/login', credentials)
      .then((response) => {
        const data = response.data
        console.log(data)
        setUsername(data.username)
        setPassword(data.password)
        setLoginAlert(false)
        props.onLogin(data.user_id)
      })
      .catch((error) => {
        setLoginAlert(true)
        console.error('Error making API call:', error)
      })
    return <LoadingPage />
  }

  return (
    <div>
      <Box maxW='sm' mx='auto' mt={8}>
        <Heading mb={4}>Login</Heading>
        <form onSubmit={handleLogin}>
          <FormControl mb={4}>
            <FormLabel>Username:</FormLabel>
            <Input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password:</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type='submit' variant='dark' mr={3}>
            Login
          </Button>
        </form>
      </Box>
      {loginAlert && (
        <Alert status='warning' bg={theme.colors.primary[700]} mt={4}>
          <AlertTitle mr={2}>Login failed! Try Again.  </AlertTitle>
          <CloseButton onClick={() => setLoginAlert(false)} position='absolute' right='2px' top='2px' scale={0.1} />
        </Alert>
      )}
    </div>
  )
}

export default Login
