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
  Center
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

import axiosInstance from 'api/axiosInterceptors';

import useAuthStore from 'store/authStore';
import { IUser } from '@types';
import { multiFormReq } from 'api/fetchUsers';
import env from 'config/env';

export default function UserProfileEdit(): JSX.Element {
  const authUser = useAuthStore(state => state.authUser);
  const setAuthUser = useAuthStore(state => state.setAuthUser);
  const userToEdit = useAuthStore(state => state.userToEdit);
  const setUserToEdit = useAuthStore(state => state.setUserToEdit);
  const clearAuth = useAuthStore(state => state.clearAuth);
  const [imagPrev, setImagPrev] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.is_admin && userToEdit) {
      setUser(userToEdit);
      setImagPrev(String(userToEdit.image));
    } else {
      setUser(authUser);
      setImagPrev(String(authUser?.image));
    }
    const editUrl =
      authUser?.is_admin && userToEdit ? env.ADMIN_URL! + userToEdit._id : env.USERS_URL!;
    setUrl(editUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, userToEdit, authUser]);

  const submitProfileEdit = async () => {
    if (user?.name && user?.phone) {
      try {
        // const updatedUser = await axiosInstance.put(url, {
        //   name: user.name,
        //   phone: user?.phone
        // });

        const updatedUser = await multiFormReq(url, user);
        setUserToEdit(null);
        if (!authUser?.is_admin && !userToEdit) {
          navigate('/profile');
          setAuthUser(updatedUser.data.user);
        } else {
          navigate('/dashboard/users');
        }
      } catch (error) {
        console.log(error);
      }
      setUser(null);
    }
  };
  const deleteAccount = async () => {
    const confirm = prompt('are you sure?');
    if (confirm) {
      try {
        await axiosInstance.delete(url);
        setUserToEdit(null);
        if (!authUser?.is_admin && !userToEdit) {
          clearAuth();
          navigate('/');
        } else {
          navigate('/dashboard/users');
        }
      } catch (error) {
        console.log(error);
      }
    }

    setUser(null);
  };

  const banAccount = async () => {
    const banUrl = (user?.is_banned ? 'unban/' : 'ban/') + user?._id;
    try {
      const updatedUser = await axiosInstance.put(env.ADMIN_URL + banUrl);

      setUserToEdit(updatedUser.data.user);
      setUser(updatedUser.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  
  const cancelEdit = () => {
    setUserToEdit(null);
    if (!authUser?.is_admin && !userToEdit) {
      navigate('/profile');
    } else {
      navigate('/dashboard/users');
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
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
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
              {/* <Button w="full">Change Icon</Button> */}
              <FormControl id="ProductImage">
                <FormLabel>User Image</FormLabel>
                <Input
                  onChange={e => {
                    setImagPrev(URL.createObjectURL(e.target.files?.[0] as any));
                    setUser(user => {
                      console.log('selectedimg:', e.target.files?.[0]);
                      return {
                        ...user,
                        image: e.target.files?.[0]
                      } as IUser;
                    });
                  }}
                  _placeholder={{ color: 'gray.500' }}
                  type="file"
                />
              </FormControl>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            onChange={e => setUser(user => ({ ...user, name: e.target.value } as IUser))}
            value={user?.name || ''}
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
        <FormControl id="phone" isRequired>
          <FormLabel>Phone</FormLabel>
          <Input
            onChange={e => setUser(user => ({ ...user, phone: +e.target.value } as IUser))}
            // onChange={e => setPhone(e.target.value)}
            value={user?.phone || ''}
            placeholder="phone"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
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
            onClick={deleteAccount}
            isDisabled={!!userToEdit && userToEdit.is_admin}
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

          <Button
            onClick={banAccount}
            isDisabled={(!!userToEdit && userToEdit.is_admin) || !userToEdit}
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'red.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg'
            }}>
            {user?.is_banned ? 'Unban User' : 'Ban User'}
          </Button>
        </Stack>
        <Stack spacing={3} direction={['column', 'row']}>
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
      </Stack>
    </Flex>
  );
}
