import React, { FC } from 'react';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack
} from '@chakra-ui/react';
import { MultiValue } from 'react-select';

import useProductsStore from 'store/productsStrore';
import { FaFilter } from 'react-icons/fa';

import useCategoriesStore from 'store/categoriesStore';
import SelectCategories from '../SelectCategories';

import './product-filter.css';

const ProductFilters: FC = () => {
  const { optionCategories, setSelectedCategories, showCategories, clearSelectedCategories } =
    useCategoriesStore();

  const { nameFilter, setNameFilter, priceFilter, setPriceFilter, clearSearchAndPrice } =
    useProductsStore();

  const clearFilters = () => {
    clearSearchAndPrice();
    clearSelectedCategories();
  };
  const priceFilterhandle = (minmax: number[]) => {
    setPriceFilter(minmax);
  };
  const searchHandle: React.ChangeEventHandler<HTMLInputElement> = e => {
    setNameFilter(e.target.value);
  };

  const selectCategories = (
    e: MultiValue<{
      label: string;
      value: string | undefined;
    }>
  ) => {
    let selectedCategories = e.map(c => ({ name: c.label, _id: c.value }));
    setSelectedCategories(selectedCategories);
  };
  return (
    <Flex mx={2} direction="column" border={'1px gray solid'}>
      <Flex m="5px" justifyContent={'space-between'}>
        <Icon as={FaFilter} />
        <Button onClick={clearFilters}>reset</Button>
      </Flex>
      <Box m="5px">
        <FormControl>
          <FormLabel htmlFor="name">Price</FormLabel>
          <RangeSlider
            aria-label={['min', 'max']}
            max={1000}
            defaultValue={[0, 1000]}
            step={25}
            onChangeEnd={priceFilterhandle}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <p>{priceFilter ? `min:${priceFilter[0]} max:${priceFilter[1]}` : ''}</p>
        </FormControl>
      </Box>
      <hr />
      <Box m="5px">
        <FormControl w={'100%'}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Flex>
            <input
              type="search"
              name="name"
              id="name"
              placeholder="search name"
              onChange={searchHandle}
              value={nameFilter || ''}
            />
          </Flex>
        </FormControl>
      </Box>
      <Box m="5px">
        <SelectCategories
          categories={optionCategories}
          selectCategories={selectCategories}
          showCategories={showCategories}
        />
      </Box>
    </Flex>
  );
};

export default ProductFilters;
