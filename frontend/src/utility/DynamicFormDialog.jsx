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
  propNames,
} from "@chakra-ui/react";
import theme from "../style/theme";
import SearchableDropdown from "./inputs/SearchableDropdown";
import { ContextProvider, getDisplayString } from "./contexts/ContextProvider";

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

  const theme = useTheme();

  const handleFieldChange = (field, value) => {
    console.log("field", field, "value", value)
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const handleInputContext = (field) => {
    let value = "";
    switch (field.type) {
      default:
        value = formData[field.name] || "";
        break;
      case "date":
        const formattedDate = new Date(formData[field.name]);
        value = formattedDate.toDateString() || "";
        break;
      case "id":
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
