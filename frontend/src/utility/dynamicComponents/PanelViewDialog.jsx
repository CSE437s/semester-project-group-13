import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CloseButton,
  Button,
  Text,
  useTheme,
  propNames,
  Spacer,
  Flex,
  Heading,
} from "@chakra-ui/react";
import theme from "../../style/theme";
import DynamicFormDialog from "./DynamicFormDialog";
import { getDisplayString, ContextProvider } from "../contexts/ContextProvider";

const PanelViewDialog = (props) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNoteDialog, setOpenNoteDialog] = useState(false);

  const [referenceData, setReferenceData] = useState({});
  const [noteMode, setNoteMode] = useState(false);
  const [noteData, setNoteData] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);


  const theme = useTheme();

  const contextLadenFields = props.context.viewFields.filter((field) =>
    field.hasOwnProperty("contextType")
  );

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

  useEffect(() => {
    setFormSubmit(false);

    if (props.data) {
      axios
        .get(ContextProvider("note").getAllEndpoint)
        .then((response) => {
          console.log("succesful api");
          const dataFromApi = response.data.data;
          if (!Array.isArray(dataFromApi) || dataFromApi.length === 0) {
            console.error("dataFromApi is not a non-empty array");
            return;
          }
          console.log("notes", response)
          setNoteData(dataFromApi);
        })
        .catch((error) => {
          console.error("Error Getting notes:", error);
        });
    }
  }, [formSubmit]);

  if (!props.data || props.data.length === 0) {
    let contextType = props.context.type;
    return (
      <p>
        Select a {contextType.charAt(0).toUpperCase() + contextType.slice(1)}
      </p>
    );
  }

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleNoteClick = () => {
    setOpenNoteDialog(true);
  };

  const handleCloseNoteDialog = () => {
    setOpenNoteDialog(false);
  };

  const handleFormSubmit = () => {
    setFormSubmit(true);
  }
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
        value =
          field.label + ": " + (props.data[field.name] == 0 ? "No" : "Yes");
        break;
      case "date":
        const formattedDate = new Date(props.data[field.name]);
        value = field.label + ": " + formattedDate.toDateString();
        break;
      case "id":
        if (referenceData[field.contextType][props.data[field.name]]) {
          value =
            field.label +
            ": " +
            referenceData[field.contextType][props.data[field.name]];
        } else {
          value = field.label + ": " + props.data[field.name];
        }
        break;
    }
    if (props.data[field.name] == undefined && field.type != "id") {
      value = "N/A";
    }
    return (
      <Text fontSize={"3vh"} key={field.name}>
        {value}
      </Text>
    );
  };

  const handleNotesToggle = () => {
    setNoteMode(!noteMode);
  };

  const handleNoteRender = () => {
    const validNotes = noteData.filter((note) => {
      return props.data[props.context.id] === note[props.context.id];
    });
    console.log("valid", validNotes)

   return validNotes.map((entry) => {
      return (
        <Flex flexDir={"column"}>
          <Heading size={'xs'}>{entry.type}</Heading>
          <Text fontSize={'xs'}>{entry.description}</Text>
        </Flex>
      );
    });
  };

  return (
    <Flex
      width={"inherit"}
      height={"inherit"}
      flexDir={"column"}
      justifyContent={"space-evenly"}
    >
      <Flex flexDir="row" justifyContent={"space-evenly"}>
        <h1>
          {getDisplayString(props.context, props.data) ||
            props.context.viewTitle}
        </h1>
        <CloseButton size="md" onClick={() => {
          props.onClose()
          if (noteMode) {handleNotesToggle()}}} />
      </Flex>
      <Flex
        flexDir={"column"}
        id="panel-body"
        maxHeight={"60vh"}
        overflowY={"auto"}
      >
        {!noteMode
          ? props.context.viewFields.map((field) => handleInfoContext(field))
          : handleNoteRender()}
        <DynamicFormDialog
          isOpen={openEditDialog}
          onClose={handleCloseEditDialog}
          context={props.context}
          onSubmit={(formData) => {
            props.onSubmit();
            props.context.edit(formData);
          }}
          formFields={props.context.editFields}
          title={props.context.editTitle}
          existData={props.data}
        ></DynamicFormDialog>
        <DynamicFormDialog
          isOpen={openNoteDialog}
          onClose={handleCloseNoteDialog}
          context={props.context}
          onSubmit={(formData) => {
            handleFormSubmit();
            //props.onSubmit();
            ContextProvider("note").create(formData);
          }}
          formFields={ContextProvider("note").createFields}
          title={ContextProvider("note").createTitle}
          existData={props.data}
        ></DynamicFormDialog>
      </Flex>
      <Flex
        id="panel-footer"
        justifyContent={"space-evenly"}
        flexDir={"column"}
      >
        {!["donation", "request", "user", "admin", "neighbor"].includes(
          props.context.type
        ) ? (
          <Flex flexDir={"row"} flex={1} width={'95%'} justifyContent={'space-evenly'} alignItems={'center'}> 

            <Button flex={2} variant={"solid"} onClick={handleNotesToggle}>
              Toggle Notes
            </Button>
            <Spacer/>
            <Button flex={2} variant={"solid"} onClick={handleNoteClick}>
              Add Note
            </Button>
          </Flex>
        ) : null}
        <Spacer flex={10}></Spacer>
        <Flex flexDir={"row"} flex={1} width={'95%'} justifyContent={'space-evenly'} alignItems={'center'}> 

          <Button flex={2} variant={"dark"} onClick={handleDeleteClick}>
            Delete
          </Button>
          <Spacer/>
          <Button flex={2} variant={"solid"} onClick={handleEditClick}>
            Edit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PanelViewDialog;
