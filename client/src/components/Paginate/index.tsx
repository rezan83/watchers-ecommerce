import React from 'react';
import { Button, Flex, Icon } from '@chakra-ui/react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import useProductsStore from 'store/productsStrore';

const Paginate = () => {
  const products = useProductsStore(state => state.products);
  const setPage = useProductsStore(state => state.setPage);
  const page = useProductsStore(state => state.page);

  return (
    <Flex>
      <Button onClick={() => setPage(-1)} isDisabled={page <= 1}>
        <Icon as={FaChevronCircleLeft} />
      </Button>
      <Button>{page}</Button>
      <Button onClick={() => setPage(1)} isDisabled={!products?.next}>
        <Icon as={FaChevronCircleRight} />
      </Button>
    </Flex>
  );
};

export default Paginate;
