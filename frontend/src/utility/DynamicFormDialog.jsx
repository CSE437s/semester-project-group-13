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
  console.log("theme", theme);

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
        if(existData && existData[fieldContext.id]){
          value = {value: existData[fieldContext.id], label: getDisplayString(fieldContext, existData)}
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
          <Button
            bg={theme.colors.purple[500]}
            color={"white"}
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
          <Button
            bg={"white"}
            color={theme.colors.purple[500]}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DynamicFormDialog;
