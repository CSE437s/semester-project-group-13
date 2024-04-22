import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [referenceData, setReferenceData] = useState({})
  const theme = useTheme();

  const viewFieldNames = props.context.viewFields.map((field) => field.name);
  const contextLadenFields = props.context.viewFields.filter((field) => field.hasOwnProperty("contextType"));
  const contextLadenFieldNames = contextLadenFields
    ? contextLadenFields.map((field) => field.name)
    : null;
  const fieldContexts = contextLadenFields
    ? contextLadenFields.reduce((acc, field) => {
        acc[field.name] = field.contextType;
        return acc;
      }, {})
    : null;

    useEffect(() => {
      if (props.data) {
        contextLadenFields.forEach((entry) => {
          const fieldContext = ContextProvider(entry.contextType);
          axios
            .get(fieldContext.getAllEndpoint)
            .then((response) => {
              console.log("succesful api");
              const dataFromApi = response.data.data;
              if (!Array.isArray(dataFromApi) || dataFromApi.length === 0) {
                console.error("dataFromApi is not a non-empty array");
                return;
              }
              setReferenceData((prevData) => ({
                ...prevData,
                [fieldContext.type]: dataFromApi.reduce((acc, entry) => {
                  acc[entry[fieldContext.id]] = getDisplayString(
                    fieldContext,
                    entry
                  );
                  return acc;
                }, {}),
              }));
            })
            .catch((error) => {
              console.error("Error making API call:", error);
            });
        });
      } else {
        console.log("no data given");
      }
    }, [props.data]);

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
        if(referenceData[field.contextType][props.data[field.name]]){
          value = field.label + ": " + referenceData[field.contextType][props.data[field.name]]
        } else {
          value = field.label + ": " + props.data[field.name]
        }
        break;
    }
    if(props.data[field.name] == undefined && field.type != 'id'){
      value = "N/A"
    }
    return <Text fontSize={'3vh'} key={field.name}>{value}</Text>;
  };

  // const prepareViewData = (selectedData) => {
  //   const viewDataDict = {};
  //   Object.keys(selectedData).forEach((key) => {
  //     if (viewFieldNames.includes(key)) {
  //       if (
  //         contextLadenFieldNames.includes(key) &&
  //         referenceData.hasOwnProperty(fieldContexts[key])
  //       ) {
  //         const fieldContext = ContextProvider(fieldContexts[key]);
  //         const referenceRow = referenceData[fieldContexts[key]][0]
  //         //.find((entry) => 
  //         //entry[fieldContext.id] === selectedData[key])
  //         console.log(referenceData[fieldContexts[key]])
  //         viewDataDict[key] = referenceRow
  //           ? getDisplayString(fieldContext, referenceRow)
  //           : selectedData[key];
  //       } else {
  //         viewDataDict[key] = selectedData[key];
  //       }
  //     }
  //   });
  //   return viewDataDict;
  // };

  // const viewData = prepareViewData(props.data)

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

          {/* handle context buttons */}
          <Spacer/>
          <Button
          flex={2}
            variant={'dark'}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
          <Spacer/>
          <Button
          flex={2}
            variant={'solid'}
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Spacer/>
          {/* <Button
            variant={'outline'}
            onClick={props.onClose}
          >
            Cancel
          </Button> */}

          </Flex>
          </Flex>
  );
};

export default PanelViewDialog;
