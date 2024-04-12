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
  Spacer,
  Flex
} from "@chakra-ui/react";
import theme from "../../style/theme";
import DynamicFormDialog from "./DynamicFormDialog";
import { getDisplayString } from "../contexts/ContextProvider";

const DynamicViewDialog = (props) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const theme = useTheme();

  if (!props.data || props.data.length === 0) {
    return <p>No Data Found</p>;
  }

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleDeleteClick = () => {
    props.context.delete(props.data);
    props.onSubmit();
    props.onClose();
  };

  const handleInfoContext = (field) => {
    let value = "";

    switch (field.type) {
      default:
        value = field.label + ": " + props.data[field.name];
        break;
      case "bool":
        value = field.label + ": " + (props.data[field.name] == 0 ? "No" : "Yes");
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

      <Flex>
        <h1>{getDisplayString(props.context, props.data) || props.context.viewTitle}</h1>
        {/* <ModalCloseButton /> */}
        {/* close button? */}
        <Flex>
          {props.context.viewFields.map((field) =>
            handleInfoContext(field)
          )}
          {(() => {
            switch (props.context.type) {
              // case "refugee":
              //   return (
              
              //   );
              default:
                return null; // Render nothing by default or handle other cases
            }
          })()}
          <DynamicFormDialog
            isOpen={openEditDialog}
            onClose={handleCloseEditDialog}
            context={props.context}
            onSubmit={(formData) => {
              props.onSubmit();
              props.context.edit(formData)
            }}
            formFields={props.context.editFields}
            title={props.context.editTitle}
            existData={props.data}
          ></DynamicFormDialog>
        </Flex>
        <Flex>
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
          </Flex>
          </Flex>
  );
};

export default DynamicViewDialog;
