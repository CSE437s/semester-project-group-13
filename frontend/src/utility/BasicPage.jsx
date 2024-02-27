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
    <div>
      <CSSReset />
      <Box textAlign="center" mt="8" flex={1}>
        <Button onClick={onOpen}>{props.title}</Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowX={'auto'} overflowY={'auto'}>
            {props.children}
          </ModalBody>
          <ModalFooter>
            <Button bg={'white'} color={theme.colors.purple[500]} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BasicPage;
