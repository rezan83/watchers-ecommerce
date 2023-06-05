import { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
  Select,
  Textarea
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { MultiValue } from 'react-select';

import { multiFormReq } from 'api/productsApi';
import { IProduct } from '@types';
import useCartStore from 'store/cartStore';

import useProductsStore from 'store/productsStrore';
import Rating from 'components/ProductCard/ProductRating';
import { addOrUpdateReview } from 'api/reviewsApi';

const initialProduct: IProduct = {
  name: '',
  price: 0
};

export default function ProductAddReview(): JSX.Element {
  const productToReview = useProductsStore(state => state.productToReview);
  const setProductToReview = useProductsStore(state => state.setProductToReview);

  const [rating, setSelectRating] = useState(0);
  const [comment, setCOmment] = useState('');

  //   const productToReview = useCartStore(state => {
  //     return state.productToReview;
  //   });

  const navigate = useNavigate();
  //   const [product, setProduct] = useState<IProduct>(productToReview || initialProduct);
  //   const [imagPrev, setImagPrev] = useState('');

  const submitProductReview = async () => {
    addOrUpdateReview({ product: productToReview?._id || '', comment, rating });
    // console.log(productToReview?._id, comment, rate)
    //   try {
    //     const res = await multiFormReq(product, !!productToReview);
    //     if (res) {
    //       setProductToEdit(null);
    //       fetchStoreProducts();
    //       navigate('/products');
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
  };

  const cancelEdit = () => {
    setProductToReview(null);
    setSelectRating(0);
    setCOmment('');

    navigate('/profile');
  };

  //   useEffect(() => {
  //     if (productToReview) {
  //       setProduct(productToReview);
  //       setImagPrev(String(productToReview.image));
  //     } else {
  //       setProduct(initialProduct);
  //     }
  //   }, [productToReview]);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
        direction={['column']}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          {/* {productToReview ? 'Review' : 'Edit Review'}  */}
          Review Purchase: {productToReview ? productToReview?.name : 'not available'}
        </Heading>
        <form id="form" encType="multipart/form-data">
          <Stack my={6} spacing={3} direction={['column']}>
            <FormControl id="add-product">
              {/* <FormLabel>Product Image</FormLabel> */}
              <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                  <Avatar
                    size="xl"
                    src={productToReview ? String(productToReview?.image) : 'notavailable.png'}>
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
              </Stack>
            </FormControl>

            <FormControl id="ProductReview">
              <FormLabel>Product Review</FormLabel>
              <Textarea
                onChange={e => setCOmment(e.target.value)}
                value={comment}
                placeholder="Product veview"
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>

            <Box m="5px">
              <Rating rating={rating} setSelectRating={setSelectRating} />
            </Box>
          </Stack>
          <Stack spacing={3} direction={['column']}>
            <Stack spacing={3} direction={['column', 'row']}>
              <Button
                onClick={cancelEdit}
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500'
                }}>
                Cancel
              </Button>
            </Stack>
            <Stack spacing={3} direction={['column', 'row']}>
              <Button
                onClick={submitProductReview}
                bg={'blue.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'blue.500'
                }}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
