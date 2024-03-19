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
  Text,
  useTheme,
} from '@chakra-ui/react';
import theme from '../style/theme';
import DynamicFormDialog from './DynamicFormDialog';

const DynamicViewDialog = ({ title, isOpen, onClose, onDelete, onEdit, data, editFields, editTitle}) => {
//   const [formData, setFormData] = useState(existData);
//   const [formAlert, setFormAlert] = useState(false);
const [openEditDialog, setOpenEditDialog] = useState(false);
const theme = useTheme();
console.log('theme', theme)

if(!data){
    return (<p>No Data Found</p>)
}



//   const handleFieldChange = (field, value) => {
//     setFormData((prevData) => ({ ...prevData, [field]: value }));
//   };

//   const handleFormSubmit = () => {
//     onSubmit(formData);
//     onClose();
//   };

//   const handleEdit = () => {
//     onSubmit(formData);
//     onClose();
//   };

    const handleEditClick = () => {
        setOpenEditDialog(true);
    }

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    }

    const handleDeleteClick = () => {
        onClose();
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        {
            Object.entries(data).map(([key, value]) => (
                <Text key={key}>
                    {key + ": " + value}
              </Text>
            ))
        }
        {<DynamicFormDialog
            isOpen={openEditDialog}
            onClose={handleCloseEditDialog}
            onSubmit={onEdit}
            formFields={editFields}
            title={editTitle}
            existData={data}
        >
        </DynamicFormDialog>}
          {/* {formFields.map((field) => (
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
          ))} */}
        </ModalBody>
        <ModalFooter>
          <Button bg={theme.colors.purple[500]} color={'white'} onClick={handleDeleteClick}>
            Delete
          </Button>
          <Button bg={theme.colors.purple[200]} color={'white'} onClick={handleEditClick}>
            Edit
          </Button>
          <Button bg={'white'} color={theme.colors.purple[500]} onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DynamicViewDialog;
