import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { ContextProvider, getDisplayString } from './../contexts/ContextProvider';

const SearchableDropdown = (props) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({})
  const context = ContextProvider(props.contextType);

  console.log("dropdown render")
  console.log(props.value)

  const handleSelectChange = (e) => {
    console.log(e)
    console.log(e.value)

    setSelectedOption(e)
    props.onChange(e.value)
  }

  useEffect(() => {
    axios
      .get(context.getAllEndpoint)
      .then((response) => {
        console.log(response);
        const dataFromApi = response.data.data;
        console.log("pulled Data", dataFromApi)
        let optionsFromApi = [];
        if(!Array.isArray(dataFromApi) || dataFromApi.length === 0) {
          console.error("dataFromApi is not a non-empty array");
        }
        dataFromApi.forEach((entry) => {
          let displayString = getDisplayString(context, entry)

          console.log('displayString', displayString)
          optionsFromApi.push({ key:entry[context.id], value: entry[context.id], label: displayString });
        });
        console.log(dataFromApi);
        setOptions(optionsFromApi);
      })
      .catch((error) => {
        console.error("Error making API call:", error);
      });
  }, []);

  return (
    <FormControl key={props.key}>
      <FormLabel>{props.label}</FormLabel>
      <Select
        options={options}
        onChange={handleSelectChange}
        isSearchable={true}
        defaultValue={selectedOption || props.value}
        required
      />
    </FormControl>
  );
};

export default SearchableDropdown;
