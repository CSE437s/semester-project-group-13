import React, { useState } from "react";
import {
  CloseButton,
  Button,
  Text,
  useTheme,
  propNames,
  Spacer,
  Flex
} from "@chakra-ui/react";
import theme from "../../style/theme";
import DynamicFormDialog from "./DynamicFormDialog";
import { getDisplayString, ContextProvider} from "../contexts/ContextProvider";

const PanelViewDialog = (props) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const theme = useTheme();

  if (!props.data || props.data.length === 0) {
    let contextType = props.context.type;
    return <p>Select a {contextType.charAt(0).toUpperCase() + contextType.slice(1)}</p>;
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
        value = field.label + ": " + getDisplayString(ContextProvider('donator'), props.viewData)
        break;
    }
    if(props.data[field.name] == undefined && field.type != 'id'){
      value = "N/A"
    }
    return <Text fontSize={'3vh'} key={field.name}>{value}</Text>;
  };

  return (

      <Flex width={'inherit'} height={'inherit'} flexDir={'column'} justifyContent={'space-evenly'}>
        <Flex flexDir='row' justifyContent={'space-evenly'}>
          <h1>{getDisplayString(props.context, props.data) || props.context.viewTitle}</h1>
          <CloseButton size="md" onClick={props.onClose()} />
        </Flex>
        <Flex flexDir={'column'} id='panel-body' maxHeight={'60vh'} overflowY={'auto'}>
          {props.context.viewFields.map((field) =>
            handleInfoContext(field)
          )}
          {(() => {
            //implement context sensitivity
            switch (props.context.type) {
              default:
                return (
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
                )
            }
          })()}
        </Flex>
        <Flex id='panel-footer' flexDir={'row'} justifyContent={'space-evenly'}>
        {(() => {
            //implement context sensitivity
            switch (props.context.type) {

              default:
                return null
            }
          })()}

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
          <Spacer/>

          </Flex>
          </Flex>
  );
};

export default PanelViewDialog;
