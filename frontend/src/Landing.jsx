import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useTheme, Flex, Button, Spacer } from '@chakra-ui/react';
import theme from './style/theme';
import DynamicTable from './utility/DynamicTable';
import TabButton from './utility/TabButton'; // Assuming you have a custom TabButton component
import { ContextProvider, getAllContexts } from './utility/contexts/ContextProvider';
import MapComponent from './MapComponent';
import DynamicFormDialog from './utility/DynamicFormDialog';

const Landing = (props) => {
  const theme = useTheme();
  const contexts = getAllContexts();
  const defaultPage = "refugee";

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultPage);
  const [context, setContext] = useState(contexts[defaultPage])
  const [data, setData] = useState({})

  const handleTabChange = (tab) => {
    setActiveTab(prevTab => {
      console.log(data)
      if(tab != 'mapComponent'){
        setContext(contexts[tab]);
      }
      return tab;
    });
  };

  const handleLogout = () => {    
      axios.post('http://localhost:8080/auth/logout')
        .then((response) => {
          const data = response.data;
          props.onLogout();
        })
        .catch((error) => {
          console.error('Error making API call:', error);
        });
    };

    const handleOpenCreateDialog = () => {
      setOpenCreateDialog(true);
    };
  
    const handleCloseCreateDialog = () => {
      setOpenCreateDialog(false);
    };

  useEffect(() => {
      Object.entries(contexts).forEach((entry) => {
        axios
          .get(entry[1].getAllEndpoint)
          .then((response) => {
            console.log("succesful api")
            const dataFromApi = response.data.data;
            if (!Array.isArray(dataFromApi) || dataFromApi.length === 0) {
              console.error("dataFromApi is not a non-empty array");
              return;
            }

            setData((prevData) => ({
              ...prevData,
              [entry[0]]: dataFromApi
            }));
          })
          .catch((error) => {
            console.error("Error making API call:", error);
          });
        });
  }, []);

  return (
      <Flex flexDirection="column" width="100vw" height="100vh">
          <Flex id="header" justifyContent="flex-end" alignItems="center" bg="primary.900" p={4} height={'10vh'} position="fixed" width="100%" zIndex="999">
              <Button variant="dark" onClick={handleLogout}>
                Logout
            </Button>
          </Flex>
          
          <Flex id="body" flexDirection="row" flex={8} height={'90vh'} marginTop="10vh">
            {/* Sidebar */}
            <Flex id="sidebar" flexDirection="column" flex={1} maxWidth={'15vw'} position="fixed" height="90vh" overflowY="auto">
              <TabButton onClick={() => handleTabChange('refugee')} isActive={activeTab === 'refugee'}>Refugees</TabButton>
              <TabButton onClick={() => handleTabChange('volunteer')} isActive={activeTab === 'volunteer'}>Volunteers</TabButton>
              <TabButton onClick={() => handleTabChange('donation')} isActive={activeTab === 'donation'}>Donations</TabButton>
              <TabButton onClick={() => handleTabChange('goodNeighbor')} isActive={activeTab === 'goodNeighbor'}>Good Neighbors</TabButton>
              <TabButton onClick={() => handleTabChange('family')} isActive={activeTab === 'family'}>Families</TabButton>
              <TabButton onClick={() => handleTabChange('mapComponent')} isActive={activeTab === 'mapComponent'}>Map Component</TabButton>
            </Flex>


              {activeTab !== "mapComponent" ?
                <Flex id="main-display" maxWidth="85vw" width="85vw" flexDir="column" justifyContent="flex-start" marginLeft="15vw" p={2}>
                  <DynamicFormDialog
                    isOpen={openCreateDialog}
                    onClose={handleCloseCreateDialog}
                    onSubmit={context.create}
                    formFields={context.createFields}
                    title={context.createTitle}
                  />
                  <DynamicTable
                    context={context}
                    data={data[activeTab]}
                  ></DynamicTable>
                  <Button width={'20%'} my={2} 
                  variant={"solid"}
                    onClick={handleOpenCreateDialog}
                  >
                    {context.createTitle}
                  </Button>
                </Flex>
              :
                <MapComponent
                  variant={"mainDisplay"}
                ></MapComponent>
              }



          </Flex>
      </Flex>
  );
};
 
export default Landing;