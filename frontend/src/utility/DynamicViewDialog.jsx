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
  Spacer
} from "@chakra-ui/react";
import theme from "../style/theme";
import DynamicFormDialog from "./DynamicFormDialog";
import { getDisplayString } from "./contexts/ContextProvider";

const DynamicViewDialog = (props) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const theme = useTheme();

  if (!props.data) {
    return <p>No Data Found</p>;
  }

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
      case "id":
        console.log("viewData", props.viewData)
        value = field.label + ": " + props.viewData[field.name]
        break;
    }

    return <Text key={field.name}>{value}</Text>;
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{getDisplayString(props.context, props.data) || props.context.viewTitle}</ModalHeader>
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
        <Spacer/>         
        <Spacer/>
        <Spacer/>
        <Spacer/>
        <Spacer/>
          <Button
            variant={'dark'}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
          <Spacer/>
          <Button
            variant={'solid'}
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Spacer/>
          <Button
            variant={'outline'}
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
