import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, theme, useTheme } from "@chakra-ui/react";
import translateBE from "../translateBE";
import { ContextProvider, getDisplayString } from "../contexts/ContextProvider";
import axios from "axios";
import LoadingPage from "../LoadingPage";

const DynamicTable = (props) => {
  //const [selectedRow, setSelectedRow] = useState(-1);
  //const [openViewDialog, setOpenViewDialog] = useState(false);
  const [columnData, setColumnData] = useState({});

  const theme = useTheme();

  const displayFieldNames = props.context.displayFields.map(
    (field) => field.name
  );
  const contextLadenFields = props.context.displayFields.filter((field) =>
    field.hasOwnProperty("contextType")
  );
  const contextLadenFieldNames = contextLadenFields.map((field) => field.name);
  const fieldContexts = contextLadenFields.reduce((acc, field) => {
    acc[field.name] = field.contextType;
    return acc;
  }, {});
  console.log(contextLadenFields);

  useEffect(() => {
    if (props.data && props.data.length) {
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
            setColumnData((prevData) => ({
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

  if (!props.data || !props.data.length) {
    console.log("props", props.data, props.context);
    //return "No Data Available";
    return <LoadingPage></LoadingPage>
  }

  const handleRowClick = (index) => {
    props.onClick(index);
  };

  const columns = Object.keys(props.data[0]);
  const filteredColumns = columns.filter(
    (column) => column != props.context.id
  );

  const handleColumnContext = (column) => {
    if (displayFieldNames.includes(column)) {
      return <Th key={column}>{translateBE(column)}</Th>;
    }
  };

  const handleRowContext = (row, rowIndex, column) => {
    let displayString = translateBE(row[column]);
    if (displayFieldNames.includes(column)) {
      if (
        contextLadenFieldNames.includes(column) &&
        columnData.hasOwnProperty(fieldContexts[column])
      ) {
        displayString = columnData[fieldContexts[column]][row[column]];
      } else if (contextLadenFieldNames.includes(column) || column == 'amount') {
        displayString = row[column];
      } 
      return rowIndex == props.selectedRow ? (
        <Td key={column} bg={theme.colors.primary[300]}>{displayString}</Td>
      ) : (
        <Td key={column}>{displayString}</Td>
      );
    }
  };

  const prepareViewData = (data) => {
    const viewDataDict = {};
    Object.keys(data).forEach((key) => {
      if (displayFieldNames.includes(key)) {
        if (
          contextLadenFieldNames.includes(key) &&
          columnData.hasOwnProperty(fieldContexts[key])
        ) {
          viewDataDict[key] = columnData[fieldContexts[key]][data[key]];
        } else {
          viewDataDict[key] = data[key];
        }
      }
    });
    return viewDataDict;
  };

  const isRowVisible = (row, rowIndex) => {
    if (row["is_deleted"] || row["is_deleted"] == undefined) {
      return false;
    }

    if (!props.searchValue){
      return true;
    }

    if (props.context.type == "donation" || props.context.type == "request"){
      if(row['completed'] == 1) return false;
    }

    const viewData = prepareViewData(row);
  
    return Object.values(viewData).some((item) => {
      switch (typeof item) {
        case "string":
          return item.toLowerCase().includes(props.searchValue);
        default:
          return false;
      }
    });
  };
  

  return (
    <Box>
      <Table variant="main" px={1} py={2}>
        <Thead>
          <Tr>
            {filteredColumns.map((column) => handleColumnContext(column))}
          </Tr>
        </Thead>
        <Tbody>
          {props.data.map((row, rowIndex) =>
            isRowVisible(row, rowIndex) ? (
              <Tr key={rowIndex} onClick={() => handleRowClick(rowIndex)}>
                {filteredColumns.map((column) =>
                  handleRowContext(row, rowIndex, column)
                )}
              </Tr>
            ) : null
          )}
        </Tbody>
      </Table>

      <Button
        width={"20%"}
        my={2}
        variant={"solid"}
        onClick={props.onViewMore}
      >
        {"View More"}
      </Button>
    </Box>
  );
};

export default DynamicTable;
