import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from '@chakra-ui/react';
import translateBE from './translateBE';
import DynamicFormDialog from './DynamicFormDialog';
import DynamicViewDialog from './DynamicViewDialog';

const DynamicTable = (props) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);



  if (!props.data || !props.data.length) {
    return <p>No props.data available</p>;
  }

  const handleRowClick = (index) => {
    setSelectedRow(index);
    setOpenViewDialog(true);
    // props.onRowSelect()
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedRow(-1);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedRow(-1);
  };

  const columns = Object.keys(props.data[0]);
  const filteredColumns = columns.filter(
    (column) => !column.toLowerCase().endsWith("id")
  );

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            {filteredColumns.map((column) => (
              <Th key={column}>{translateBE(column)}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {props.data.map((row, rowIndex) => (
            <Tr key={rowIndex} onClick={() => handleRowClick(rowIndex)}>
              {filteredColumns.map((column) => (
                <Td key={column}>{translateBE(row[column])}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedRow !== -1 && (
        //isOpen, onClose, onDelete, onEdit, data, editFields, editTitle
        // <DynamicFormDialog
        //   isOpen={openEditDialog}
        //   onClose={handleCloseEditDialog}
        //   onSubmit={props.onEdit}
        //   formFields={props.editFields}
        //   title={props.editTitle}
        //   existData={props.data[selectedRow]}
        // >
        // </DynamicFormDialog>
        <DynamicViewDialog
          isOpen={openViewDialog}
          onClose={handleCloseViewDialog}
          onEdit={props.onEdit}
          editFields={props.editFields}
          title={props.editTitle}
          data={props.data[selectedRow]}
          onDelete={props.onDelete}
        >
        </DynamicViewDialog>
        // <Box className="dialog">
        //   <p>Row details: {JSON.stringify(data[selectedRow])}</p>
        //   <Button onClick={handleCloseDialog}>Close</Button>
        // </Box>
      )}
    </Box>
  );
};

export default DynamicTable;
