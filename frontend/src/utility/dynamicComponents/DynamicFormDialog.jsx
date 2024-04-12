import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useTheme,
  Spacer,
  Alert,
  AlertTitle,
  CloseButton,
  RadioGroup,
  Stack,
  Radio
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import theme from "../../style/theme";
import SearchableDropdown from "../inputs/SearchableDropdown";
import { ContextProvider, getDisplayString } from "../contexts/ContextProvider";
import translateBE from "../translateBE";
import "react-datepicker/dist/react-datepicker.css";


const DynamicFormDialog = ({
  isOpen,
  onClose,
  onSubmit,
  formFields,
  title,
  existData = {},
}) => {
  const [formData, setFormData] = useState(existData);
  const [formAlert, setFormAlert] = useState(false);
  const [formErrors, setFormErrors] = useState([])

  const theme = useTheme();

  const handleFieldChange = (field, value) => {
    console.log("field", field.name, "value", value)
    if(field.type == "date"){
      value = value.toISOString().split('T')[0]
    }
    setFormData((prevData) => ({ ...prevData, [field.name]: value }));

  };
  
  const validateField = (field, value) => {
    switch (field.type) {
      case "text":
        return value.trim() !== "";
      case "email":
        const emailPattern = /\S+@\S+\.\S+/;
        return emailPattern.test(value);
      case "date":
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        return datePattern.test(value);
      case "phone":
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(value);
      case "id":
      case "number":
        return !isNaN(value);
      default:
        return true;
    }
  };
  

  const handleFormSubmit = () => {
    setFormErrors([]);
    formFields.forEach((field) => {
      if(!formData[field.name]){
        setFormErrors((prevErrors) => [
          ...prevErrors,
          "Missing Field: " + translateBE(field.name)
        ]);    
          
      } else {
        const valid = validateField(field, formData[field.name]);
        if (!valid) {
          setFormErrors((prevErrors) => [
            ...prevErrors,
            "Invalid Field Data: " + translateBE(field.name)
          ]);
        }
      }
    });    

    if (formErrors.length === 0) {
      setFormErrors([]);
      onSubmit(formData);
      onClose();
    } else {
      setFormAlert(true);
    }
  };

  const handleInputContext = (field) => {
    let value = "";
    switch (field.type) {
      case "bool":
        value = formData[field.name] ? formData[field.name] : ""; // Assuming the value is either true or false
        return (
          <FormControl key={field.name} mb={4}>
            <FormLabel>{field.label}</FormLabel>
            <RadioGroup onChange={(e) => handleFieldChange(field, e)} defaultValue={value}>
              <Stack direction="row">
                <Radio value="1">Yes</Radio>
                <Radio value="0">No</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        );
      case "date":
        return (
          <FormControl key={field.name} mb={4}>
            <FormLabel>{field.label}</FormLabel>
            <DatePicker
              selected={formData[field.name] ? new Date(formData[field.name]) : null}
              onChange={(date) => handleFieldChange(field, date)}
              dateFormat="MM/dd/yyyy"
              isClearable
              placeholderText="MM/DD/YYYY"
            />
          </FormControl>
        );
      case "id":
        if (field.name === "user_id") {
          if (localStorage.getItem("loginData")) {
            formData[field.name] = JSON.parse(localStorage.getItem("loginData")).user_id;
          }
          return null;
        }
        const fieldContext = ContextProvider(field.contextType);
        if (formData && formData[fieldContext.id]) {
          value = { value: formData[fieldContext.id], label: getDisplayString(fieldContext, formData) };
        } else {
          value = {};
        }
        return (
          <SearchableDropdown
            contextType={field.contextType}
            label={field.label}
            onChange={(selectedOption) => handleFieldChange(field, selectedOption)}
            defaultValue={value}
            key={field.name}
          />
        );
      default:
        value = formData[field.name] || "";
        return (
          <FormControl key={field.name} mb={4}>
            <FormLabel>{field.label}</FormLabel>
            <Input
              type={field.type}
              defaultValue={value}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              required
            />
          </FormControl>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {formFields.map((field) => (handleInputContext(field)))}
          {formAlert ? (
            <Alert status="warning" bg={theme.colors.primary[700]} color={'white'} mt={4} borderRadius={'md'}>
              <AlertTitle mr={2}>Form Submission Failed!</AlertTitle>
              <CloseButton onClick={() => setFormAlert(false)} position="absolute" right="2px" top="2px" scale={.1} />
            </Alert>
          ) : null}
          {formErrors.length > 0 ? (
            <ul>
              {formErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          ) : null}
        </ModalBody>
        <ModalFooter>
            <Spacer/>         
            <Spacer/>
            <Spacer/>
            <Spacer/>         
            <Spacer/>
            <Spacer/>
          <Button
            variant={"outline"}
            onClick={onClose}
          >
            Cancel
          </Button>
            <Spacer/>
          <Button
            variant={"solid"}
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DynamicFormDialog;
