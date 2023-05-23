import { useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ProductCard from 'components/ProductCard';
import useProductsStore from 'store/productsStrore';
import useCartStore from 'store/cartStore';
import PaypalBtn from 'components/PaypalBtn';
import Paginate from 'components/Paginate';

const Products = ({ cart }: { cart?: boolean }) => {
  const fetchStoreProducts = useProductsStore(state => state.fetchStoreProducts);
  const products = useProductsStore(state => state.products);
  const priceFilter = useProductsStore(state => state.priceFilter);
  const nameFilter = useProductsStore(state => state.nameFilter);
  const limit = useProductsStore(state => state.limit);
  const page = useProductsStore(state => state.page);
  const cartProducts = useCartStore(state => state.cartItems);
  const cartTotal = useCartStore(state => state.cartTotal());
  const currency = useCartStore(state => state.currency);
 

  useEffect(() => {
    if (!cart) {
      fetchStoreProducts(priceFilter, nameFilter, limit, page);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, cartProducts, priceFilter, nameFilter, limit, page]);

  return (
    <>
      <h1>{(cart ? cartProducts : products.products).length ? (cart ? 'Cart' : 'Products') : 'No Items'}</h1>
      <SimpleGrid columns={cart ? [2] : [1]} spacing={5} justifyItems={'center'}>
       
        <Paginate/>
        <SimpleGrid p="1rem" columns={cart ? [1] : [1, 2, 2, 3]} spacing={5}>
          {(cart ? cartProducts : products.products).map(product => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </SimpleGrid>
        {cart && (
          <div>
            <h2>
              Total: {currency}
              {cartTotal}
            </h2>
            <PaypalBtn />
          </div>
        )}
      </SimpleGrid>
    </>
  );
};

export default Products;
