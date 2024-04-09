import React, { useState, useEffect } from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react'
import translateBE from '../translateBE'
import DynamicFormDialog from './DynamicFormDialog'
import DynamicViewDialog from './DynamicViewDialog'
import { ContextProvider, getDisplayString } from '../contexts/ContextProvider'
import axios from 'axios'
import LoadingPage from '../LoadingPage'

const DynamicTable = (props) => {
  const [selectedRow, setSelectedRow] = useState(-1)
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [columnData, setColumnData] = useState({})
  const viewFieldNames = props.context.viewFields.map(field => field.name)
  const contextLadenFields = props.context.viewFields.filter(field => field.hasOwnProperty('contextType'))
  const contextLadenFieldNames = contextLadenFields.map(field => field.name)
  const fieldContexts = contextLadenFields.reduce((acc, field) => {
    acc[field.name] = field.contextType
    return acc
  }, {})
  console.log(contextLadenFields)

  useEffect(() => {
    if (props.data && props.data.length) {
      contextLadenFields.forEach((entry) => {
        const fieldContext = ContextProvider(entry.contextType)
        axios
          .get(fieldContext.getAllEndpoint)
          .then((response) => {
            console.log('succesful api')
            const dataFromApi = response.data.data
            if (!Array.isArray(dataFromApi) || dataFromApi.length === 0) {
              console.error('dataFromApi is not a non-empty array')
              return
            }

            setColumnData((prevData) => ({
              ...prevData,
              [fieldContext.type]: dataFromApi.reduce((acc, entry) => {
                acc[entry[fieldContext.id]] = getDisplayString(fieldContext, entry)
                return acc
              }, {})
            }))
          })
          .catch((error) => {
            console.error('Error making API call:', error)
          })
      })
    }
  }, [props.data])

  if (!props.data || !props.data.length) {
    console.log('props', props.data, props.context)
    return <LoadingPage />
  }

  const handleRowClick = (index) => {
    setSelectedRow(index)
    setOpenViewDialog(true)
  }

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false)
    setSelectedRow(-1)
  }

  const columns = Object.keys(props.data[0])
  const filteredColumns = columns.filter(
    (column) => column != props.context.id
  )

  const handleColumnContext = (column) => {
    if (viewFieldNames.includes(column)) {
      return <Th key={column}>{translateBE(column)}</Th>
    }
  }

  const handleRowContext = (row, rowIndex, column) => {
    if (viewFieldNames.includes(column)) {
      if (contextLadenFieldNames.includes(column) && columnData.hasOwnProperty(fieldContexts[column])) {
        const displayString = columnData[fieldContexts[column]][row[column]]
        return <Td key={column}>{displayString}</Td>
      }
      return <Td key={column}>{translateBE(row[column])}</Td>
    }
  }

  const prepareViewData = (data) => {
    const viewDataDict = {}
    Object.keys(data).forEach((key) => {
      if (viewFieldNames.includes(key)) {
        if (contextLadenFieldNames.includes(key) && columnData.hasOwnProperty(fieldContexts[key])) {
          viewDataDict[key] = columnData[fieldContexts[key]][data[key]]
        } else {
          viewDataDict[key] = data[key]
        }
      }
    })
    return viewDataDict
  }

  return (
    <Box>
      <Table variant='main' px={1} py={2}>
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
          onSubmit={props.onSubmit}
          viewData={prepareViewData(props.data[selectedRow])}
          contextLadenFieldNames={contextLadenFieldNames}
          fieldContexts={fieldContexts}
        />
      )}
    </Box>
  )
}

export default DynamicTable
