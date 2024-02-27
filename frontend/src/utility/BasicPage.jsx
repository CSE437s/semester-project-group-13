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
  useTheme
} from '@chakra-ui/react';
import theme from '../style/theme';

const BasicPage = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <ChakraProvider>
      <CSSReset />
      <Box textAlign="center" mt="8">
        <Button borderColor={theme.colors.purple[700]} border={'solid 2px'} onClick={onOpen}>{props.title}</Button>
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
            <Button color={theme.colors.purple[500]} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default BasicPage;
