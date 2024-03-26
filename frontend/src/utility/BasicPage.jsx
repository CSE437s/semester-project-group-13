import React from 'react';
import {
  Box,
  Button,
  CSSReset,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useTheme,
  Flex
} from '@chakra-ui/react';
import theme from '../style/theme';

const BasicPage = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <Flex width={'inherit'}>
      <Box textAlign="center" variant={'solid'} mt="8" flex={1} width={'100%'}>
        <Button onClick={onOpen}>{props.title}</Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size='xl' >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowX={'auto'} overflowY={'auto'}>
            {props.children}
          </ModalBody>
          <ModalFooter>
            <Button variant={'outline'} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default BasicPage;
