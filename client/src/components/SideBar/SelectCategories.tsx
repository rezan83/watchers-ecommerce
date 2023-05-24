import React from 'react';
import { Box } from '@chakra-ui/react';
import Select, { MultiValue } from 'react-select';

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
  defaultValue?: {
    label: string;
    value: string | undefined;
}[]|undefined
}) => {
  return (
    <Box m="5px">
      <label htmlFor="">Categories</label>
      <Select
        defaultValue={defaultValue}
        // value={[selectCategories[0]]}
        onChange={selectCategories}
        isMulti
        name="categories"
        options={categories}
        className="categories-multi-select"
        classNamePrefix="select"
      />
    </Box>
  );
};

export default SelectCategories;
