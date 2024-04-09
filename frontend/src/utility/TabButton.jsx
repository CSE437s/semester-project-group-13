import { Button } from '@chakra-ui/react'

const TabButton = ({ children, isActive, onClick }) => (
  <Button
    onClick={onClick}
    variant={isActive ? 'dark' : 'solid'}
    colorScheme='primary'
    borderRadius={0}
    borderTopRadius={isActive ? 'md' : 0}
    borderBottomRadius={isActive ? 'md' : 0}
    _hover={{ bg: 'primary.700' }}
    _active={{ bg: 'primary.800' }}
    _focus={{ boxShadow: 'none' }}
    mt={1}
    py={3}
    px={7}
    textAlign='left'
    width='100%'
    whiteSpace='nowrap'
    overflow='hidden'
    textOverflow='ellipsis'
    fontWeight='normal'
    fontSize='xl'
    fontFamily='Monospace'
    color={isActive ? 'white' : 'primary.200'}
    flex={1}
  >
    {children}
  </Button>
)

export default TabButton
