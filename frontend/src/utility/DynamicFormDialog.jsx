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
} from '@chakra-ui/react';

const DynamicFormDialog = ({ isOpen, onClose, onSubmit, formFields, title}) => {
  const [formData, setFormData] = useState({});

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
              />
            </FormControl>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" onClick={handleFormSubmit}>
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DynamicFormDialog;
