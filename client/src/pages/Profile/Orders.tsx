import React from 'react';
// Chakra imports
import { Flex, Grid, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import GenericCard from 'components/GenericCard/GenericCard';
import GenericCardBody from 'components/GenericCard/GenericCardBody';
import GenericCardHeader from 'components/GenericCard/GenericCardHeader';
import OrderCard from './OrderCard';
import useUsersStore from 'store/usersStore';
import { IProduct } from '@types';

const Orders = ({
  title,
  description,
  products
}: {
  title: string;
  description: string;
  products: any;
}) => {
  const purchasedAndAvailableProducts = useUsersStore(state => state.purchasedAndAvailableProducts);
  // Chakra color mode
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <GenericCard p="16px" my="24px">
      <GenericCardHeader p="12px 5px" mb="12px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500" fontWeight="400">
            {description}
          </Text>
        </Flex>
      </GenericCardHeader>
      <GenericCardBody px="5px">
        <Grid
          templateColumns={{ sm: '1fr', md: '1fr 1fr', xl: 'repeat(4, 1fr)' }}
          templateRows={{ sm: '1fr 1fr 1fr auto', md: '1fr', xl: '1fr' }}
          gap="24px">
          {products.map((product: any) => {
            const isAvailableProduct = purchasedAndAvailableProducts?.find(
              (p: IProduct) => p._id === product.id
            );
            return (
              <OrderCard
                key={product.id}
                id={product.id}
                image={isAvailableProduct ? String(isAvailableProduct.image) : 'notavailable.png'}
                name={product.name}
                price={product.price}
                description={isAvailableProduct?.description || 'No description'}
              />
            );
          })}
        </Grid>
      </GenericCardBody>
    </GenericCard>
  );
};

export default Orders;
