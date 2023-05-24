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
  Box
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { MultiValue } from 'react-select';

import { multiFormReq, deleteProduct } from 'api/crudProducts';
import { IProduct } from '@types';
import useCartStore from 'store/cartStore';
import SelectCategories from 'components/SideBar/SelectCategories';
import useCategoriesStore from 'store/categoriesStore';

const initialProduct: IProduct = {
  name: '',
  price: 0
};

export default function UserProfileEdit(): JSX.Element {
  const setProductToEdit = useCartStore(state => state.setProductToEdit);
  const categories = useCategoriesStore(state =>
    state.categories.map(c => ({ label: c.name, value: c._id }))
  );

  const { productToEdit, defaultValue } = useCartStore(state => {
    const productToEdit = state.productToEdit;
    const defaultValue = productToEdit?.categories?.map(c => {
      const label = categories.find(ct => ct.value === c)?.label!;
      return { value: c, label };
    });
    return { productToEdit, defaultValue };
  });

  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct>(initialProduct);
  const [imagPrev, setImagPrev] = useState('');

  const selectCategories = (
    e: MultiValue<{
      label: string;
      value: string | undefined;
    }>
  ) => {
    const selectedCat = e.map(c => c.value) as string[];
    setProduct(product => ({
      ...product,
      categories: [...selectedCat]
    }));
    console.log(product);
  };

  const submitProductAdd = async () => {
    try {
      const res = await multiFormReq(product, !!productToEdit);
      if (res) {
        setProductToEdit(null);
        navigate('/products');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitDeleteProduct = async () => {
    if (productToEdit) {
      // call api
      // axiosInstance.delete(proccess.env.)
      try {
        await deleteProduct(productToEdit._id!);
        setProductToEdit(null);
        navigate('/products');
      } catch (error) {
        console.log(error);
      }
    }
  };
  const cancelEdit = () => {
    if (productToEdit) {
      setProductToEdit(null);
    } else {
      setProduct(initialProduct);
    }
    navigate('/products');
  };

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
      setImagPrev(String(productToEdit.image));
    } else {
      setProduct(initialProduct);
    }
  }, [productToEdit]);

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
          {productToEdit ? 'Edit' : 'Add'} Product
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
            <FormControl id="ProductDescription">
              <FormLabel>Product Description</FormLabel>
              <Input
                onChange={e => setProduct(product => ({ ...product, description: e.target.value }))}
                value={product?.description || ''}
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
            <Box m="5px">
              <label htmlFor="">Categories</label>
              <SelectCategories
                categories={categories}
                selectCategories={selectCategories}
                defaultValue={defaultValue}
              />
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

              <Button
                onClick={submitDeleteProduct}
                isDisabled={!productToEdit}
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
