import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme, Flex, Button, Spacer } from "@chakra-ui/react";
import theme from "./style/theme";
import DynamicTable from "./utility/dynamicComponents/DynamicTable";
import TabButton from "./utility/TabButton"; // Assuming you have a custom TabButton component
import {
  ContextProvider,
  getAllContexts,
} from "./utility/contexts/ContextProvider";
import MapComponent from "./MapComponent";
import DynamicFormDialog from "./utility/dynamicComponents/DynamicFormDialog";
import SearchBar from "./utility/inputs/SearchBar";
import PanelViewDialog from "./utility/dynamicComponents/PanelViewDialog";
import LoadingPage from "./utility/LoadingPage";

const Landing = (props) => {
  const theme = useTheme();
  const contexts = getAllContexts();
  const defaultPage = "refugee";

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultPage);
  const [data, setData] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRow, setSelectedRow] = useState(-1);

    const viewFieldNames = activeTab != 'mapComponent' ? contexts[activeTab].viewFields.map(
      (field) => field.name
    ) : null;
    const contextLadenFields = activeTab != 'mapComponent' ? contexts[activeTab].viewFields.filter((field) =>
      field.hasOwnProperty("contextType")
    ): null;
    const contextLadenFieldNames = contextLadenFields ? contextLadenFields.map((field) => field.name) : null;
    const fieldContexts = contextLadenFields ? contextLadenFields.reduce((acc, field) => {
      acc[field.name] = field.contextType;
      return acc;
    }, {}) : null;


  const handleTabChange = (tab) => {
    setActiveTab((prevTab) => {
      console.log("tab change", data);
      return tab;
    });
    setSelectedRow(-1);
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/auth/logout")
      .then((response) => {
        const data = response.data;
        props.onLogout();
      })
      .catch((error) => {
        console.error("Error making API call:", error);
      });
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleFormSubmit = () => {
    setFormSubmit(true);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleViewDialog = (index) => {
    setSelectedRow(index);
  };

  // const handleSearch = () => {
  //   // Implement your search logic here
  //   console.log("Search:", searchValue);
  // };

  useEffect(() => {
    let newData = {};
    setFormSubmit(false);
    Object.entries(contexts).forEach((entry) => {
      axios
        .get(entry[1].getAllEndpoint)
        .then((response) => {
          console.log("succesful api");
          const dataFromApi = response.data.data;
          if (!Array.isArray(dataFromApi) || dataFromApi.length === 0) {
            console.error("dataFromApi is not a non-empty array");
            return;
          }
          newData[entry[0]] = dataFromApi;
        })
        .catch((error) => {
          console.error("Error making API call:", error);
        });
    });
    setData(newData);
  }, [formSubmit]);

  
  if(!data){
    if(activeTab !== 'mapComponent' && !data[activeTab]){
      return <LoadingPage></LoadingPage>
    }
  }

  const prepareViewData = (selectedData) => {
    const viewDataDict = {};
    Object.keys(selectedData).forEach((key) => {
      if (viewFieldNames.includes(key)) {
        if (
          contextLadenFieldNames.includes(key) &&
          data.hasOwnProperty(fieldContexts[key])
        ) {
          viewDataDict[key] = data[fieldContexts[key]][selectedData[key]];
        } else {
          viewDataDict[key] = selectedData[key];
        }
      }
    });
    return viewDataDict;
  };

  const handlePanelClose = () => {
    setSelectedRow(-1);
  };

  return (
    <Flex
      flexDirection="column"
      width="100vw"
      height="100vh"
      overflow={"hidden"}
    >
      <Flex
        id="header"
        justifyContent="flex-end"
        alignItems="center"
        bg="primary.900"
        p={4}
        height={"10vh"}
        position="fixed"
        width="100%"
        zIndex="999"
      >
        <Spacer flex={20} />
        <Button
          variant="lessDark"
          onClick={() => handleTabChange("admin")}
          flex={2}
        >
          Admin
        </Button>
        <Spacer flex={1} />
        <Button variant="dark" onClick={handleLogout} flex={2}>
          Logout
        </Button>
      </Flex>

      <Flex
        id="body"
        flexDirection="row"
        flex={8}
        width={'100%'}
        height={"90vh"}
        marginTop="10vh"
      >
        {/* Sidebar */}
        <Flex
          id="sidebar"
          flexDirection="column"
          flex={1}
          maxWidth={"15vw"}
          position="fixed"
          height="90vh"
          overflowY="auto"
        >
          <TabButton
            onClick={() => handleTabChange("refugee")}
            isActive={activeTab === "refugee"}
          >
            Refugees
          </TabButton>
          <TabButton
            onClick={() => handleTabChange("donator")}
            isActive={activeTab === "donator"}
          >
            Donators
          </TabButton>
          <TabButton
            onClick={() => handleTabChange("donation")}
            isActive={activeTab === "donation"}
          >
            Donations
          </TabButton>
          <TabButton
            onClick={() => handleTabChange("neighbor")}
            isActive={activeTab === "neighbor"}
          >
            Good Neighbors
          </TabButton>
          <TabButton
            onClick={() => handleTabChange("family")}
            isActive={activeTab === "family"}
          >
            Families
          </TabButton>
          <TabButton
            onClick={() => handleTabChange("mapComponent")}
            isActive={activeTab === "mapComponent"}
          >
            Map Component
          </TabButton>
        </Flex>
        {activeTab !== "mapComponent" ? (
          <Flex
            id="main-display"
            maxWidth="85vw"
            width="85vw"
            flexDir="column"
            justifyContent="flex-start"
            marginLeft="15vw"
            p={2}
            overflowX={"auto"}
            overflowY={"auto"}
          >
            <DynamicFormDialog
              isOpen={openCreateDialog}
              onClose={handleCloseCreateDialog}
              onSubmit={(formData) => {
                handleFormSubmit();
                contexts[activeTab].create(formData);
              }}
              formFields={contexts[activeTab].createFields}
              title={contexts[activeTab].createTitle}
            />
            <DynamicTable
              context={contexts[activeTab]}
              data={data[activeTab]}
              onSubmit={handleFormSubmit}
              onClick={handleViewDialog}
              searchValue={searchValue}
            ></DynamicTable>
            <Button
              width={"20%"}
              my={2}
              variant={"solid"}
              onClick={handleOpenCreateDialog}
            >
              {contexts[activeTab].createTitle}
            </Button>
          </Flex>
        ) : (
          <MapComponent variant={"mainDisplay"}></MapComponent>
        )}
        {activeTab !== "mapComponent" ? (
          <Flex id="side-panel" flexDir={"column"} width={"20vw"} p={2} mx={2}>
            <SearchBar
              value={searchValue}
              onChange={handleSearchChange}
              onClear={handleClearSearch}
              // onSearch={handleSearch}
            />
            <PanelViewDialog
              isOpen={
                selectedRow !== -1 && selectedRow < data[activeTab]?.length
              }
              context={contexts[activeTab]}
              onClose={() => handlePanelClose}
              data={
                selectedRow !== -1 && data[activeTab]
                  ? data[activeTab][selectedRow]
                  : []
              }
              onSubmit={handleFormSubmit}
              viewData={
                selectedRow !== -1 && data[activeTab]
                  ? prepareViewData(data[activeTab][selectedRow])
                  : []
              }
              contextLadenFieldNames={contextLadenFieldNames}
              fieldContexts={fieldContexts}
            ></PanelViewDialog>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default Landing;
