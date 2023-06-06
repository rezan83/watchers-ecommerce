import { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
  Textarea
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

import useProductsStore from 'store/productsStrore';
import Rating from 'components/ProductCard/ProductRating';
import { addOrUpdateReview } from 'api/reviewsApi';

// const initialReview: IReview = {
//   product: '',
//   rating: 0,
//   comment: '',
// };

export default function ProductAddReview(): JSX.Element {
  const navigate = useNavigate();
  
  const { productToReview, oldReview, fetchStroeProductToReview } = useProductsStore();

  const [rating, setSelectRating] = useState(oldReview?.rating || 0);
  const [comment, setComment] = useState(oldReview?.comment || '');


  const submitProductReview = async () => {
    try {
      await addOrUpdateReview({ product: productToReview?._id || '', comment, rating });
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    fetchStroeProductToReview(null);
    setSelectRating(0);
    setComment('');
    navigate('/profile');
  };

  useEffect(() => {
    if (oldReview) {
      setComment(oldReview.comment)
      setSelectRating(oldReview.rating)
    }
  }, [oldReview])
  

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
          {oldReview ? 'Update' : ''} Review Purchase:{' '}
          {productToReview ? productToReview?.name : 'not available'}
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
                onChange={e => setComment(e.target.value)}
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
