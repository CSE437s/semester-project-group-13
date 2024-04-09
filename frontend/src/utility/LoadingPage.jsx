import React, { useState, useEffect } from 'react'
import { Flex, Spinner, Text } from '@chakra-ui/react'

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2000 milliseconds (2 seconds) delay

    return () => clearTimeout(timer)
  }, [])

  return isLoading
    ? (
      <Flex
        justifyContent='center'
        alignItems='center'
        width='100%'
        height='100%'
      >
        <Spinner size='xl' color='primary.500' />
        <Text ml={4} fontSize='xl' color='primary.500'>
          Loading...
        </Text>
      </Flex>
      )
    : null
}

export default LoadingPage
