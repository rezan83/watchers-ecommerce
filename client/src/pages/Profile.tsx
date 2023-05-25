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
import useAuthStore from 'store/authStore';

export default function Profile() {
  const authUser = useAuthStore(state => state.authUser);
  const navigate = useNavigate();

  return (
    <Center py={6}>
      <Box
        maxW={'90%'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
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
        <Flex justify={'center'} mt={-12}>
          <Avatar
            name="Avatar"
            size={'xl'}
            src={String(authUser?.image)}
            css={{
              border: '2px solid white'
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {authUser?.name}
            </Heading>
            <Text color={'gray.500'}> {authUser?.email}</Text>
            <Text color={'gray.500'}> {authUser?.phone}</Text>
            {authUser?.is_admin && <Text color={'gray.500'}> Admin</Text>}
          </Stack>

          <Button
            onClick={() => navigate('/edit-profile')}
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
