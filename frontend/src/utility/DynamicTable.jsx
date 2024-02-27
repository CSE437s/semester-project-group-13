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

const DynamicTable = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState(-1);

  if (!data || !data.length) {
    return <p>No data available</p>;
  }

  const handleRowClick = (index) => {
    setSelectedRow(index);
    // props.onRowSelect()
  };

  const handleCloseDialog = () => {
    setSelectedRow(-1);
  };

  const columns = Object.keys(data[0]);
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
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex} onClick={() => handleRowClick(rowIndex)}>
              {filteredColumns.map((column) => (
                <Td key={column}>{row[column]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedRow !== -1 && (
        <Box className="dialog">
          <p>Row details: {JSON.stringify(data[selectedRow])}</p>
          <Button onClick={handleCloseDialog}>Close</Button>
        </Box>
      )}
    </Box>
  );
};

export default DynamicTable;
