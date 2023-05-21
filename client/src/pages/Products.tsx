import { useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ProductCard from 'components/ProductCard';
import useProductsStore from 'store/productsStrore';
import useCartStore from 'store/cartStore';

const Products = ({ cart }: { cart?: boolean }) => {
  const fetchStoreProducts = useProductsStore(state => state.fetchStoreProducts);
  const products = useProductsStore(state => state.products);
  const cartProducts = useCartStore(state => state.cartItems);
  const cartTotal = useCartStore(state => state.cartTotal());
  const currency = useCartStore(state => state.currency);

  useEffect(() => {
    if (!cart) {
      fetchStoreProducts();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, cartProducts]);

  return (
    <>
      <h1>{(cart ? cartProducts : products).length ? (cart ? 'Cart' : 'Products') : 'No Items'}</h1>
      <SimpleGrid  columns={cart ? [2] : [1]} spacing={5}>
        <SimpleGrid p="1rem" columns={cart ? [1] : [1, 2, 2, 3]} spacing={5}>
          {(cart ? cartProducts : products).map(product => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </SimpleGrid>
        {cart && (
          <h2>
            Total: {currency}
            {cartTotal}
          </h2>
        )}
      </SimpleGrid>
    </>
  );
};

export default Products;
