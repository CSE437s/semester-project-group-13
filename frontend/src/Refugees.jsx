import React, { useState, useEffect } from 'react'
import DynamicTable from './utility/DynamicTable'
import axios from 'axios'
import BasicPage from './utility/BasicPage'
import DynamicFormDialog from './utility/DynamicFormDialog'
import theme from './style/theme'
import { Button, useTheme, Spacer } from '@chakra-ui/react'
import { ContextProvider } from './utility/contexts/ContextProvider'

const Refugees = (props) => {
  console.log('Refugee Page clicked')

  const [data, setData] = useState([])
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const theme = useTheme()
  const context = ContextProvider('refugee')
  console.log(context)

  useEffect(() => {
    axios
      .get(context.getAllEndpoint)
      .then((response) => {
        const dataFromApi = response.data.data
        console.log(dataFromApi)
        setData(dataFromApi)
      })
      .catch((error) => {
        console.error('Error making API call:', error)
      })
  }, [])

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true)
  }

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false)
  }

  return (
    <div>
      <BasicPage title='Refugees'>
        <Button
          variant='solid'
          onClick={handleOpenCreateDialog}
        >
          Add Refugee
        </Button>
        <Spacer height='5vh' />
        <DynamicTable
          data={data}
          context={context}
        />
        <DynamicFormDialog
          isOpen={openCreateDialog}
          onClose={handleCloseCreateDialog}
          onSubmit={context.create}
          formFields={context.createFields}
          title={context.createTitle}
        />
      </BasicPage>
    </div>
  )
}

export default Refugees
