import React from 'react';
import { Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

const SearchBar = ({ value, onChange, onClear, onSearch }) => {
  return (
    <InputGroup display={'flex'}>
      <Input
        placeholder="Search..."
        value={value}
        onChange={onChange}
        variant="filled"
        borderRadius="full"
        size="md"
        bg="primary.400"
      />
      <InputRightElement>
        {value && (
          <IconButton
            aria-label="Clear search"
            icon={<CloseIcon />}
            onClick={onClear}
            size="xs"
            variant="ghost"
          />
        )}
        {/* <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          onClick={onSearch}
          size="sm"
          variant="ghost"
        /> */}
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
