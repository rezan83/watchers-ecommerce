import React from 'react';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import Select, { MultiValue } from 'react-select';

import './select-categories.css';

const SelectCategories = ({
  selectCategories,
  categories,
  defaultValue
}: {
  selectCategories: (
    e: MultiValue<{
      label: string;
      value: string | undefined;
    }>
  ) => void;
  categories: {
    label: string;
    value: string | undefined;
  }[];
  defaultValue?:
    | {
        label: string;
        value: string | undefined;
      }[]
    | undefined;
}) => {
  return (
    <Box m="5px">
      <FormControl>
        <FormLabel htmlFor="name">Categories</FormLabel>
        <Select
          defaultValue={defaultValue || { label: 'All', value: '' }}
          // value={{label:'All', value: ''}}
          onChange={selectCategories}
          isMulti
          name="categories"
          options={categories}
          className="categories-multi-select"
          classNamePrefix="select"
        />
      </FormControl>
    </Box>
  );
};

export default SelectCategories;
