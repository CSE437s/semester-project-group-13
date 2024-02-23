import React, { useState } from 'react';

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
    <div>
      <table>
        <thead>
          <tr>
            {filteredColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} onClick={() => handleRowClick(rowIndex)}>
              {filteredColumns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRow !== -1 && (
        <div className="dialog">
          <p>Row details: {JSON.stringify(data[selectedRow])}</p>
          <button onClick={handleCloseDialog}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
