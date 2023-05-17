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
import { useState } from 'react';
import axiosInstance from 'helpers/intercepter';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'store';

export default function UserProfileEdit(): JSX.Element {
  const setUser = useAuthStore(state => state.setUser);
  const clearAuth = useAuthStore(state => state.clearAuth);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('Rezanxxx');
  // const [lastName, setLastName] = useState('moh');
  // const [email, setEmail] = useState('rezan@vivaldi.net');
  const [phone, setPhone] = useState('555555555555');
  const submitProfileEdit = async () => {
    if (firstName && phone) {
      try {
        const updatedUser = await axiosInstance.put(process.env.REACT_APP_USER_URL!, {
          name: firstName,
          phone
        });

        setUser(updatedUser.data.user);

        navigate('/profile');
      } catch (error) {
        console.log(error);
      }

      setPhone('');
      setFirstName('');
    }
  };
  const deleteAccount = async () => {
    const confirm = prompt('are you sure? type Yes or No', 'No');
    if (confirm === 'Yes') {
      try {
        await axiosInstance.delete(process.env.REACT_APP_USER_URL!);
        clearAuth();
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }

    setPhone('');
    setFirstName('');
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
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
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
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
            placeholder="User Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        {/* <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl> */}
        <FormControl id="password" isRequired>
          <FormLabel>Phone</FormLabel>
          <Input
            onChange={e => setPhone(e.target.value)}
            value={phone}
            placeholder="phone"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
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
            onClick={submitProfileEdit}
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500'
            }}>
            Submit
          </Button>
        </Stack>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            onClick={deleteAccount}
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'red.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg'
            }}>
            Delete Account
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
