import React, { useState, useEffect } from "react";
import image from "./images/OasisLogo.png";
import axios from "axios";
import { useTheme, Flex, Button, Spacer } from "@chakra-ui/react";
import theme from "./style/theme";
import DynamicTable from "./utility/dynamicComponents/DynamicTable";
import TabButton from "./utility/TabButton"; // Assuming you have a custom TabButton component
import {
  ContextProvider,
  getAllContexts,
  getDisplayString,
} from "./utility/contexts/ContextProvider";
import MapComponent from "./MapComponent";
import DynamicFormDialog from "./utility/dynamicComponents/DynamicFormDialog";
import SearchBar from "./utility/inputs/SearchBar";
import PanelViewDialog from "./utility/dynamicComponents/PanelViewDialog";
import { handleDatatoCSV, exportDataFields } from "./utility/contexts/Landing";

const Landing = (props) => {
  const theme = useTheme();
  const contexts = getAllContexts();
  const defaultPage = "donation";

  const [openForm, setOpenForm] = useState(false);
  const [openSecondaryForm, setOpenSecondaryForm] = useState(false);
  const [secondaryFormFields, setSecondaryFormFields] = useState([]);
  const [secondaryFormTitle, setSecondaryFormTitle] = useState("");
  const [secondaryFormSubmit, setSecondaryFormSubmit] = useState(() => {});
  const [secondaryTable, setSecondaryTable] = useState(false);

  const [activeTab, setActiveTab] = useState(defaultPage);
  const [data, setData] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRow, setSelectedRow] = useState(-1);
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    setFormSubmit(false);
    Promise.all(
      Object.entries(contexts).map(([key, value]) =>
        axios
          .get(value.getSomeEndpoint, {
            params: {
              startIndex: 0,
              limit: limit,
            },
          })
          .then((response) => {
            console.log("Successful API call for", key);
            const dataFromApi = response.data.data;
            if (!Array.isArray(dataFromApi) || dataFromApi.length === 0) {
              console.error("dataFromApi is not a non-empty array");
              return [];
            }
            return { [key]: dataFromApi };
          })
          .catch((error) => {
            console.error("Error making API call:", error);
            return {};
          })
      )
    )
      .then((results) => {
        const newData = results.reduce(
          (acc, result) => ({ ...acc, ...result }),
          {}
        );
        setData((prevData) => ({ ...prevData, ...newData }));
      })
      .catch((error) => {
        console.error("Error processing API responses:", error);
      });
  }, [formSubmit, limit]);

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

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleFormSubmit = () => {
    setFormSubmit(true);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value.toLowerCase().trim());
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const populateViewDialog = (index) => {
    setSelectedRow(index);
  };

  const handleViewMore = () => {
    setLimit((prevLimit) => prevLimit + limit);
  };

  const handlePanelClose = () => {
    setSelectedRow(-1);
  };

  // const handleOpenSecondaryForm = () => {
  //   setOpenSecondaryForm(true);
  // };

  const handleCloseSecondaryForm = () => {
    setOpenSecondaryForm(false);
  };

  const handleSecondaryForm = (formType) => {
    switch (formType) {
      case "csv":
        setSecondaryFormFields(exportDataFields);
        setSecondaryFormTitle("Export Data to CSV");
        setSecondaryFormSubmit((formData) => handleDatatoCSV);
        break;
      case "logVisit":
        setSecondaryFormFields(contexts["refugee"].utilityFields.logVisit);
        setSecondaryFormTitle("Log Visit");
        setSecondaryFormSubmit(
          (formData) => contexts["refugee"].utilityFunctions.logVisit
        );
        break;
      case "addRequest":
        setSecondaryFormFields(contexts["request"].createFields);
        setSecondaryFormTitle(contexts["request"].createTitle);
        setSecondaryFormSubmit((formData) => contexts["request"].create);
        break;
      case "logDonation":
        setSecondaryFormFields(contexts["donation"].createFields);
        setSecondaryFormTitle(contexts["donation"].createTitle);
        setSecondaryFormSubmit((formData) => contexts["donation"].create);
        break;
      case "toggleRequests":
        setSecondaryTable(!secondaryTable)
        return;
      // case "toggleCompleted":
      //   axios
      //   .get(contexts['donation'].getCompletedEndpoint, {
      //     params: {
      //       startIndex: 0,
      //       limit: limit,
      //     },
      //   })
      //   .then((response) => {
      //     console.log("Successful API call for", key);
      //     const dataFromApi = response.data.data;
      //     if (!Array.isArray(dataFromApi) || dataFromApi.length === 0) {
      //       console.error("dataFromApi is not a non-empty array");
      //       return [];
      //     }
      //     return { [key]: dataFromApi };
      //   })
      //   .catch((error) => {
      //     console.error("Error making API call:", error);
      //     return {};
      //   })
      //   break;
      // case "addMember":
      //   setSecondaryFormFields(exportDataFields);
      //   setSecondaryFormTitle("Export Data to CSV");
      //   setSecondaryFormSubmit((formData) => handleDatatoCSV);
      //   break;
      // case "addMatch":
      //   setSecondaryFormFields(exportDataFields);
      //   setSecondaryFormTitle("Export Data to CSV");
      //   setSecondaryFormSubmit((formData) => handleDatatoCSV);
      //   break;
    }
    setOpenSecondaryForm(true);
  };

  const handleHeaderButtons = () => {
    const buttons = [];
    switch (activeTab) {
      case "refugee":
        buttons.push(
          <Button
            variant="solid"
            onClick={() => handleSecondaryForm("logVisit")}
            flex={3}
          >
            Log Visit
          </Button>
        );
        buttons.push(<Spacer flex={1}></Spacer>);
        buttons.push(
          <Button
            variant="solid"
            onClick={() => handleSecondaryForm("addRequest")}
            flex={3}
          >
            Add Request
          </Button>
        );
        break;
      case "donator":
        buttons.push(
          <Button
            variant="solid"
            onClick={() => handleSecondaryForm("Log Donation")}
            flex={3}
          >
            Log Donation
          </Button>
        );
        break;

      case "donation":
        buttons.push(
          <Button
            variant="solid"
            onClick={() => handleSecondaryForm("toggleRequests")}
            flex={3}
          >
            Toggle Requests
          </Button>
        );
        buttons.push(<Spacer flex={1}></Spacer>);
        buttons.push(
          <Button
            variant="solid"
            onClick={() => handleSecondaryForm("addRequest")}
            flex={3}
          >
            Add Request
          </Button>
        );
        break;
      case "family":
        buttons.push(
          <Button
            variant="solid"
            onClick={() => handleSecondaryForm("addMember")}
            flex={3}
          >
            Add Member
          </Button>
        );
        break;
      case "neighbor":
        buttons.push(
          <Button
            variant="solid"
            onClick={() => handleSecondaryForm("addMatch")}
            flex={3}
          >
            Add Match
          </Button>
        );
        break;
      case "admin":
      case "user":
        buttons.push(
          <Button
            variant="solid"
            onClick={() => handleSecondaryForm("csv")}
            flex={3}
          >
            Export to CSV
          </Button>
        );

        break;
      default:
        <Spacer flex={10}></Spacer>
        break;
    }
    if (activeTab !== "mapComponent") {
      buttons.push(<Spacer flex={1}></Spacer>);
      buttons.push(
        <Button variant="solid" onClick={handleOpenForm} flex={3}>
          {contexts[activeTab].createTitle}
        </Button>
      );
    }
    buttons.push(<Spacer flex={1}></Spacer>);
    buttons.push(
      <Button
        variant="lessDark"
        onClick={() => handleTabChange("admin")}
        flex={3}
      >
        Admin
      </Button>
    );
    buttons.push(<Spacer flex={1}></Spacer>);
    buttons.push(
      <Button variant="dark" onClick={handleLogout} flex={3}>
        Logout
      </Button>
    );
    return buttons;
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
        justifyContent="space-evenly"
        alignItems="center"
        bg="primary.900"
        p={4}
        height={"10vh"}
        position="fixed"
        width="100%"
        zIndex="999"
      >
        <img
          src={image}
          alt="Oasis Logo"
          style={{ width: "200px", height: "auto", marginRight: "auto" }}
        />
        <Spacer flex={5}></Spacer>
        {handleHeaderButtons()}
      </Flex>

      <Flex
        id="body"
        flexDirection="row"
        flex={8}
        width={"100%"}
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
            onClick={() => handleTabChange("donation")}
            isActive={activeTab === "donation"}
          >
            Donations
          </TabButton>
          <TabButton
            onClick={() => handleTabChange("family")}
            isActive={activeTab === "family"}
          >
            Families
          </TabButton>
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
            onClick={() => handleTabChange("neighbor")}
            isActive={activeTab === "neighbor"}
          >
            Good Neighbors
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
              isOpen={openForm}
              onClose={handleCloseForm}
              onSubmit={(formData) => {
                handleFormSubmit();
                contexts[activeTab].create(formData);
              }}
              formFields={contexts[activeTab].createFields}
              title={contexts[activeTab].createTitle}
            />
            <DynamicFormDialog
              isOpen={openSecondaryForm}
              onClose={handleCloseSecondaryForm}
              onSubmit={(formData) => {
                secondaryFormSubmit(formData);
              }}
              formFields={secondaryFormFields}
              title={secondaryFormTitle}
              existData={
                selectedRow !== -1 && data[activeTab]
                  ? data[activeTab][selectedRow]
                  : {}
              }
            />
            <DynamicTable
              context={contexts[activeTab]}
              data={data[activeTab]}
              selectedRow={selectedRow}
              onSubmit={handleFormSubmit}
              onClick={populateViewDialog}
              searchValue={searchValue}
              onViewMore={handleViewMore}
            ></DynamicTable>
            {secondaryTable ? (
              <DynamicTable
              context={contexts['request']}
              data={data['request']}
              selectedRow={selectedRow}
              onSubmit={handleFormSubmit}
              onClick={populateViewDialog}
              searchValue={searchValue}
              onViewMore={handleViewMore}
            ></DynamicTable>
            ) : null}
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
            ></PanelViewDialog>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default Landing;
