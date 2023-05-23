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
import useProductsStore from 'store/productsStrore';
import { FaFilter } from 'react-icons/fa';

const ProductFilters: FC = () => {
  const setNameFilter = useProductsStore(state => state.setNameFilter);
  const priceFilter = useProductsStore(state => state.priceFilter);
  const setPriceFilter = useProductsStore(state => state.setPriceFilter);

  const priceFilterhandle = (minmax: number[]) => {
    setPriceFilter(minmax);
  };
  const searchHandle: React.ChangeEventHandler<HTMLInputElement> = e => {
    setNameFilter(e.target.value);
  };

  return (
    <Flex m="15px" direction="column" w={'80%'}>
      <Icon as={FaFilter} />
      <h4>Price</h4>
      <div>
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
      </div>
      <hr />
      <Box>
        <label htmlFor="name">Name</label>
        <input
          type="search"
          name="name"
          id="name"
          placeholder="search name"
          onChange={searchHandle}
        />
      </Box>
    </Flex>
  );
};

export default ProductFilters;
