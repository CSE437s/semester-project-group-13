import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useTheme
} from '@chakra-ui/react';
import theme from '../style/theme';

const DynamicFormDialog = ({ isOpen, onClose, onSubmit, formFields, title, existData = {}}) => {
  const [formData, setFormData] = useState(existData);
  const [formAlert, setFormAlert] = useState(false);

  const theme = useTheme();
  console.log('theme', theme)

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    onClose();
  };



  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {formFields.map((field) => (
            <FormControl key={field.name} mb={4}>
              <FormLabel>{field.label}</FormLabel>
              <Input
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                required
              >
              </Input>
            </FormControl>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button bg={theme.colors.purple[500]} color={'white'} onClick={handleFormSubmit}>
            Submit
          </Button>
          <Button bg={'white'} color={theme.colors.purple[500]} onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DynamicFormDialog;
