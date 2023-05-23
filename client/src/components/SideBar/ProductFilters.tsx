import React, { FC, useEffect, useState } from 'react';
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
  const fetchStoreProducts = useProductsStore(state => state.fetchStoreProducts);
  const page = useProductsStore(state => state.page);
  const limit = useProductsStore(state => state.limit);
  const [priceFilter, setPriceFilter] = useState<number[] | null>(null);
  const [nameFilter, setNameFilter] = useState<string | null>(null);

  const priceFilterhandle = (minmax: number[]) => {
    setPriceFilter(minmax);
  };
  const searchHandle: React.ChangeEventHandler<HTMLInputElement> = e => {
    setNameFilter(e.target.value);
  };

  useEffect(() => {
    fetchStoreProducts(priceFilter, nameFilter, limit, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceFilter, nameFilter, limit, page]);

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
