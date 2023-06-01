import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { IUser } from '@types';
import useAuthStore from 'store/authStore';

export default function ProfileCard({ user }: { user: IUser }) {
  const userBg = user.is_banned ? ['red.800', 'red.800'] : ['white', 'gray.800'];
  const setUserToEdit = useAuthStore(state => state.setUserToEdit);
  const navigate = useNavigate();
  const goToProfileEdit = () => {
    setUserToEdit(user);
    navigate('/edit-profile');
  };
  return (
    <Center py={6}>
      <Box
        maxW={'90%'}
        w={'full'}
        bg={useColorModeValue(userBg[0], userBg[1])}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          alt={'avatar-background'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
        />
        <Flex
        justify={'space-between'}
          mt={-12}>
          <Avatar
            name="Avatar"
            size={'xl'}
            src={String(user.image)}
            css={{
              border: '2px solid white'
            }}
          />
          {user?.is_admin && <Button bg={'purple.300'}>Admin</Button>}
          {user?.is_banned && <Button bg={'red.800'}>Banned!</Button>}
        </Flex>

        <Box p={6}>
          <Stack
            spacing={0}
            p={2}
            mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              Name: {user?.name}
            </Heading>
            <Text > Email: {user?.email}</Text>
            <Text > Phone: {user?.phone}</Text>
           
          </Stack>

          <Button
            onClick={goToProfileEdit}
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg'
            }}>
            Edit
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
