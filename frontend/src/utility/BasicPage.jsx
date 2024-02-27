import React from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  CSSReset,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const BasicPage = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <ChakraProvider>
      <CSSReset />
      <Box textAlign="center" mt="8">
        <Button onClick={onOpen}>{props.title}</Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.children}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default BasicPage;
