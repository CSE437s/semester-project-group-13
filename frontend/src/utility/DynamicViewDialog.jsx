import React, { useState } from "react";
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
  propNames,
} from "@chakra-ui/react";
import theme from "../style/theme";
import DynamicFormDialog from "./DynamicFormDialog";
import { ContextProvider } from "./contexts/ContextProvider";

const DynamicViewDialog = (props) => {
  //   const [formData, setFormData] = useState(existData);
  //   const [formAlert, setFormAlert] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const theme = useTheme();
  console.log("theme", theme);

  if (!props.data) {
    return <p>No Data Found</p>;
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
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleDeleteClick = () => {
    props.context.onDelete(props.data);
    props.onClose();
  };

  const handleInfoContext = (field) => {
    let value = "";

    switch (field.type) {
      default:
        value = field.label + ": " + props.data[field.name];
        break;
      case "date":
        const formattedDate = new Date(props.data[field.name]);
        value = field.label + ": " + formattedDate.toDateString();
        break;
    }

    return <Text key={field.name}>{value}</Text>;
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.context.viewTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {props.context.viewFields.map((field) =>
            handleInfoContext(field)
          )}
          <DynamicFormDialog
            isOpen={openEditDialog}
            onClose={handleCloseEditDialog}
            context={props.context}
            onSubmit={props.context.edit}
            formFields={props.context.editFields}
            title={props.context.editTitle}
            existData={props.data}
          ></DynamicFormDialog>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={theme.colors.purple[500]}
            color={"white"}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
          <Button
            bg={theme.colors.purple[200]}
            color={"white"}
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Button
            bg={"white"}
            color={theme.colors.purple[500]}
            onClick={props.onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DynamicViewDialog;
