import React from 'react';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import Select, { MultiValue } from 'react-select';

import './select-categories.css';
import { IShowCategory } from '@types';


const SelectCategories = ({
  selectCategories,
  categories,
  showCategories,
}: {
  selectCategories: (e: MultiValue<IShowCategory>) => void;
  categories: IShowCategory[];
  showCategories: IShowCategory[];
}) => {
  return (
    <Box m="5px">
      <FormControl>
        <FormLabel htmlFor="name">Categories</FormLabel>
        <Select
          value={showCategories.length? showCategories: { label: 'All', value: '' }}
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
