import React, { FC } from 'react';

import {
  Box,
  Flex,
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
import './productFilter.css';
import SelectCategories from './SelectCategories';

const ProductFilters: FC = () => {
  const categories = useCategoriesStore(state =>
    state.categories.map(c => ({ label: c.name, value: c._id }))
  );
  const setSelectedCategories = useCategoriesStore(state => state.setSelectedCategories);

  const setNameFilter = useProductsStore(state => state.setNameFilter);
  const priceFilter = useProductsStore(state => state.priceFilter);
  const setPriceFilter = useProductsStore(state => state.setPriceFilter);

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
    <Flex m="15px" direction="column" w={'80%'}>
      <Icon as={FaFilter} />
      <h4>Price</h4>
      <Box m="5px">
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
      </Box>
      <hr />
      <Box m="5px">
        <label htmlFor="name">Name</label>
        <input
          type="search"
          name="name"
          id="name"
          placeholder="search name"
          onChange={searchHandle}
        />
      </Box>
      <Box m="5px">
        <label htmlFor="">Categories</label>
        <SelectCategories categories={categories} selectCategories={selectCategories} />
      </Box>
    </Flex>
  );
};

export default ProductFilters;
