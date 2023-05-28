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

// const data = {
//   isNew: true,
//   image:
//     'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
//   name: 'Wayfarer Classic',
//   price: 4.5,
//   rating: 4.2,
//   numReviews: 34
// };

// interface RatingProps {
//   rating: number;
//   numReviews: number;
// }

// function Rating({ rating, numReviews }: RatingProps) {
//   return (
//     <Box display="flex" alignItems="center">
//       {Array(5)
//         .fill('')
//         .map((_, i) => {
//           const roundedRating = Math.round(rating * 2) / 2;
//           if (roundedRating - i >= 1) {
//             return (
//               <BsStarFill
//                 key={i}
//                 style={{ marginLeft: '1' }}
//                 color={i < rating ? 'teal.500' : 'gray.300'}
//               />
//             );
//           }
//           if (roundedRating - i === 0.5) {
//             return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
//           }
//           return <BsStar key={i} style={{ marginLeft: '1' }} />;
//         })}
//       <Box as="span" ml="2" color="gray.600" fontSize="sm">
//         {numReviews} review{numReviews > 1 && 's'}
//       </Box>
//     </Box>
//   );
// }

function ProductCard({ product }: { product: IProduct }) {
  const navigate = useNavigate();
  const isAdmin = useAuthStore(state => state.authUser?.is_admin);
  const addToCartStore = useCartStore(state => state.addToCartStore);
  const setProductToEdit = useCartStore(state => state.setProductToEdit);
  const setProductDetails = useCartStore(state => state.setProductDetails);
  const isProductInCart = useCartStore(state => state.isProductInCart(product._id!));
  const currency = useCartStore(state => state.currency);

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
          w="100%"
          src={String(product.image)}
          alt={`Picture of ${product.name}`}
          roundedTop="lg"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {/* {product.isNew && (
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                  New
                </Badge>
              )} */}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Link onClick={showProductDetails}>
              <Box
                fontSize="xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated>
                {product.name}
              </Box>
            </Link>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
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
