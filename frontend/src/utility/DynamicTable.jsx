import React, { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import translateBE from "./translateBE";
import DynamicFormDialog from "./DynamicFormDialog";
import DynamicViewDialog from "./DynamicViewDialog";

const DynamicTable = (props) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [openViewDialog, setOpenViewDialog] = useState(false);

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
    (column) => !column.toLowerCase().endsWith("id")
  );

  const handleColumnContext = (column) => {
    return <Th key={column}>{translateBE(column)}</Th>;
  };

  const handleRowContext = (row, column) => {
    return <Td key={column}>{translateBE(row[column])}</Td>;
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
              {filteredColumns.map((column) => handleRowContext(row, column))}
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
