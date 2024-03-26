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
} from "@chakra-ui/react";
import theme from "../../style/theme";
import SearchableDropdown from "../inputs/SearchableDropdown";
import { ContextProvider, getDisplayString } from "../contexts/ContextProvider";
import translateBE from "../translateBE";

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
    console.log("field", field, "value", value)
    setFormData((prevData) => ({ ...prevData, [field]: value }));
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
      default:
        value = formData[field.name] || "";
        break;
      case "date":
        const formattedDate = new Date(formData[field.name]);
        value = formData[field.name] ? formattedDate.toDateString() : "";
        break;
      case "id":
        if(field.name == "user_id"){
          formData[field.name] = JSON.parse(localStorage.getItem('loginData')).user_id;
          break;
        }
        const fieldContext = ContextProvider(field.contextType)
        if(formData && formData[fieldContext.id]){
          value = {value: formData[fieldContext.id], label: getDisplayString(fieldContext, formData)}
        } else {
          value = {}
        }
        console.log(formData)
        break;
    }

    return (() => {
      switch (field.type) {
        case "id":
          if(field.name == 'user_id'){
            return;
          }
          return (
            <SearchableDropdown
              contextType={field.contextType}
              label={field.label}
              onChange={(selectedOption) => handleFieldChange(field.name, selectedOption)}
              value={value}
              key={field.name}
            >
            </SearchableDropdown>
          );
        default:
          return (
            <FormControl key={field.name} mb={4}>
              <FormLabel>{field.label}</FormLabel>
              <Input
                type={field.type}
                value={value}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                required
              />
            </FormControl>
          );
      }
    })();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {formFields.map((field) => (handleInputContext(field)))}
          {formAlert && (
            <Alert status="warning" bg={theme.colors.primary[700]} color={'white'} mt={4} borderRadius={'md'}>
              <AlertTitle mr={2}>Form Submission Failed!</AlertTitle>
              <CloseButton onClick={() => setFormAlert(false)} position="absolute" right="2px" top="2px" scale={.1} />
            </Alert>
          )}
          {formErrors.length > 0 && (
            <ul>
              {formErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
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
