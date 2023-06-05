import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Button,
  Link
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { IProduct } from '@types';
import useAuthStore from 'store/authStore';
import useCartStore from 'store/cartStore';
import Rating from './ProductRating';
import useProductsStore from 'store/productsStrore';

function ProductCard({ product }: { product: IProduct }) {
  const navigate = useNavigate();
  const isAdmin = useAuthStore(state => state.authUser?.is_admin);

  const addToCartStore = useCartStore(state => state.addToCartStore);
  const setProductDetails = useCartStore(state => state.setProductDetails);
  const currency = useCartStore(state => state.currency);
  const isProductInCart = useCartStore(state => state.isProductInCart(product._id!));

  const setProductToEdit = useProductsStore(state => state.setProductToEdit);

  const goToProductEdit = () => {
    setProductToEdit(product);
    navigate('/dashboard/add-products');
  };
  const showProductDetails = () => {
    setProductDetails(product._id!);
    navigate('/product-details');
  };
  const addToCart = () => {
    addToCartStore(product);
  };

  return (
    <Flex p={10} w="310px" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        w="100%"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative">
        {/* {product.isNew && (
            <Circle
              size="10px"
              position="absolute"
              top={2}
              right={2}
              bg="red.200"
            />
          )} */}

        <Image
          onClick={showProductDetails}
          cursor={'pointer'}
          w="100%"
          src={String(product.image)}
          alt={`Picture of ${product.name}`}
          roundedTop="lg"
        />

        <Box p="6">
          {/* <Box display="flex" alignItems="baseline">
            {product.isNew && (
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                  New
                </Badge>
              )}
          </Box> */}
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Link onClick={showProductDetails}>
              <Box fontSize="xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                {product.name}
              </Box>
            </Link>
          </Flex>

          <Flex mt="1" justifyContent="space-between" alignContent="center">
           
              <Rating rating={product.rating || 0} numReviews={(product as any).reviews_count || 0} />
          
           
            
          </Flex>
          
          <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="h5" fontSize="lg">
                <p>
                  {currency}
                  {product.price.toFixed(2)}
                </p>
              </Box>
            </Box>
            <Tooltip
              label={isProductInCart ? 'Remove from cart' : 'Add to cart'}
              bg="white"
              placement={'top'}
              color={'gray.800'}
              fontSize={'1.2em'}>
              <chakra.a href={'#'} display={'flex'}>
                <Icon
                  onClick={addToCart}
                  as={FiShoppingCart}
                  h={7}
                  w={7}
                  alignSelf={'center'}
                  color={isProductInCart ? 'dodgerblue' : 'white'}
                />
              </chakra.a>
            </Tooltip>
          </Flex>
        </Box>
        {isAdmin && (
          <Button
            onClick={goToProductEdit}
            w={'full'}
            mt={8}
            // bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg'
            }}>
            Edit
          </Button>
        )}
      </Box>
    </Flex>
  );
}

export default ProductCard;
