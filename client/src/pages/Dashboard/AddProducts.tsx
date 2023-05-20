import { useState } from 'react';
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
  Center
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import multiFormReq from 'api/multiFormReq';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '@types';

const initialProduct: IProduct = {
  name: '',
  price: 0
};

export default function UserProfileEdit(): JSX.Element {
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct>(initialProduct);
  const [imagPrev, setImagPrev] = useState('');

  const submitProductAdd = async () => {
    try {
      const res = await multiFormReq(product);
      if (res) {
        navigate('/products');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          Add Product
        </Heading>
        <form id="form" encType="multipart/form-data">
          <Stack spacing={3} direction={['column']}>
            <FormControl id="add-product">
              {/* <FormLabel>Product Image</FormLabel> */}
              <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                  <Avatar size="xl" src={imagPrev}>
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
                <Center w="full">
                  {/* <Button w="full">Change Image</Button> */}
                  <FormControl id="ProductImage">
                    <FormLabel>Product Image</FormLabel>
                    <Input
                      onChange={e => {
                        setImagPrev(URL.createObjectURL(e.target.files?.[0] as any));
                        setProduct(product => {
                          return {
                            ...product,
                            image: e.target.files?.[0]
                          };
                        });
                      }}
                      _placeholder={{ color: 'gray.500' }}
                      type="file"
                    />
                  </FormControl>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="ProductName" isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                onChange={e => setProduct(product => ({ ...product, name: e.target.value }))}
                value={product?.name}
                placeholder="Product Name"
                _placeholder={{ color: 'gray.500' }}
                type="text"
              />
            </FormControl>
            <FormControl id="ProductDescription" isRequired>
              <FormLabel>Product Description</FormLabel>
              <Input
                onChange={e => setProduct(product => ({ ...product, description: e.target.value }))}
                value={product?.description}
                placeholder="Product description"
                _placeholder={{ color: 'gray.500' }}
                type="text"
              />
            </FormControl>

            <FormControl id="Price" isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                onChange={e => setProduct(product => ({ ...product, price: +e.target.value }))}
                value={product?.price}
                placeholder="Price"
                _placeholder={{ color: 'gray.500' }}
                type="text"
              />
            </FormControl>
          </Stack>
          <Stack spacing={3} direction={['column']}>
            <Stack spacing={3} direction={['column', 'row']}>
              <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500'
                }}>
                Cancel
              </Button>

              <Button
                // onClick={deleteAccount}
                w={'full'}
                mt={8}
                bg={useColorModeValue('#151f21', 'red.900')}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg'
                }}>
                Delete Product
              </Button>
            </Stack>
            <Stack spacing={3} direction={['column', 'row']}>
              <Button
                onClick={submitProductAdd}
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
