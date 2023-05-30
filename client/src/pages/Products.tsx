import { useEffect } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import ProductCard from 'components/ProductCard';
import useProductsStore from 'store/productsStrore';
import useCartStore from 'store/cartStore';
import PaypalBtn from 'components/PaypalBtn';
import Paginate from 'components/Paginate';

const Products = ({ cart }: { cart?: boolean }) => {
  const products = useProductsStore(state => state.products);
  const cartProducts = useCartStore(state => state.cartItems);
  const cartTotal = useCartStore(state => state.cartTotal());
  const currency = useCartStore(state => state.currency);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <>
      <h1>
        {(cart ? cartProducts : products.products).length
          ? cart
            ? `Cart: ${currency}${cartTotal}`
            : 'Products'
          : 'No Items'}
      </h1>
      <SimpleGrid columns={[1]} spacing={5} justifyItems={'center'}>
        {!cart && <Paginate />}

        <SimpleGrid p="1rem" columns={[1, 2, 2, 3]} spacing={5}>
          {(cart ? cartProducts : products.products).map(product => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </SimpleGrid>
        {cart && (
          <Box w={'80%'}>
            <h2>
              Total: {currency}
              {cartTotal}
            </h2>
            <PaypalBtn />
          </Box>
        )}
      </SimpleGrid>
    </>
  );
};

export default Products;
