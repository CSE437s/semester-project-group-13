import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import translateBE from "./translateBE";
import DynamicFormDialog from "./DynamicFormDialog";
import DynamicViewDialog from "./DynamicViewDialog";
import { ContextProvider, getDisplayString } from "./contexts/ContextProvider";
import axios from "axios";

const DynamicTable = (props) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [columnData, setColumnData] = useState({});
  const viewFieldNames = props.context.viewFields.map(field => field.name);
  const contextLadenFields = props.context.viewFields.filter(field => field.hasOwnProperty('contextType'));
  const contextLadenFieldNames = contextLadenFields.map(field => field.name);
  const fieldContexts = contextLadenFields.reduce((acc, field) => {
    acc[field.name] = field.contextType;
    return acc;
  }, {});
  console.log(contextLadenFields)
  
  useEffect(() => {
    if(props.data && props.data.length){
      contextLadenFields.forEach((entry) => {
        console.log("in the for each")
        const fieldContext = ContextProvider(entry.contextType);
        console.log(fieldContext)
        axios
          .get(fieldContext.getAllEndpoint)
          .then((response) => {
            console.log("succesful api")
            const dataFromApi = response.data.data;
            if (!Array.isArray(dataFromApi) || dataFromApi.length === 0) {
              console.error("dataFromApi is not a non-empty array");
              return;
            }
            // setColumnData((prevData) => ({
            //   ...prevData,
            //   [fieldContext.type]: dataFromApi.map((entry) => ({
            //     [entry[fieldContext.id]]: getDisplayString(fieldContext, entry),
            //   })),
            // }));

            setColumnData((prevData) => ({
              ...prevData,
              [fieldContext.type]: dataFromApi.reduce((acc, entry) => {
                acc[entry[fieldContext.id]] = getDisplayString(fieldContext, entry);
                return acc;
              }, {}),
            }));
          })
          .catch((error) => {
            console.error("Error making API call:", error);
          });
        });
    }
  }, [props.data]);

  if (!props.data || !props.data.length) {
    return <p>No props.data available</p>;
  }

  const handleRowClick = (index) => {
    setSelectedRow(index);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedRow(-1);
  };

  // const handleDelete = (formData) => {
  //   props.context.onDelete(formData);
  //   handleCloseViewDialog()
  // }

  const columns = Object.keys(props.data[0]);
  const filteredColumns = columns.filter(
    (column) => column != props.context.id
  );

  const handleColumnContext = (column) => {
    if(viewFieldNames.includes(column)){
      // if(props.context.viewFields[viewFieldNames.indexOf(column)].hasOwnProperty('contextType')){
      //   let fieldContext = ContextProvider(props.context.viewFields[viewFieldNames.indexOf(column)].contextType)
      //   if(columnData.hasOwnProperty(fieldContext.type)){
      //     return <Th key={column}>{translateBE(column)}</Th>;
      //   } else {
      //     useEffect(() => {
      //       axios
      //         .get(fieldContext.getAllEndpoint)
      //         .then((response) => {
      //           console.log(response);
      //           const dataFromApi = response.data.data;
      //           console.log("pulled Data", dataFromApi)
      //           let displ = [];
      //           if(!Array.isArray(dataFromApi) || dataFromApi.length === 0) {
      //             console.error("dataFromApi is not a non-empty array");
      //           }
      //           setColumnData((prevData) => ({
      //             ...prevData,
      //             [fieldContext.type]: dataFromApi.map((entry) => getDisplayString(fieldContext, entry))
      //           }));
      //         })
      //         .catch((error) => {
      //           console.error("Error making API call:", error);
      //         });
      //     });
      //   }
      // }
      return <Th key={column}>{translateBE(column)}</Th>;
    }
  };

  const handleRowContext = (row, rowIndex, column) => {

    if(viewFieldNames.includes(column)){
      if(contextLadenFieldNames.includes(column) && columnData.hasOwnProperty(fieldContexts[column])){
        //let displayString = columnData[contextLadenFields[contextLadenFieldNames.indexOf(column)].contextType][rowIndex] || "";
        console.log(fieldContexts)

        let displayString = columnData[fieldContexts[column]][row[column]]
        console.log("table ds", displayString)
        return <Td key={column}>{displayString}</Td>;
      }
      console.log(columnData)
      return <Td key={column}>{translateBE(row[column])}</Td>;
    }
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            {filteredColumns.map((column) => handleColumnContext(column))}
          </Tr>
        </Thead>
        <Tbody>
          {props.data.map((row, rowIndex) => (
            <Tr key={rowIndex} onClick={() => handleRowClick(rowIndex)}>
              {filteredColumns.map((column) => handleRowContext(row, rowIndex, column))}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedRow !== -1 && (
        <DynamicViewDialog
          isOpen={openViewDialog}
          onClose={handleCloseViewDialog}
          context={props.context}
          data={props.data[selectedRow]}
        ></DynamicViewDialog>
      )}
    </Box>
  );
};

export default DynamicTable;
