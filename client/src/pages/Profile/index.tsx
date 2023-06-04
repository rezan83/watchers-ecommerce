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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'store/authStore';
import useUsersStore from 'store/usersStore';
import Orders from './Orders';

export default function Profile() {
  const authUser = useAuthStore(state => state.authUser);
  const navigate = useNavigate();
  const bgColor = authUser?.is_admin ? ['purple.300', 'purple.300'] : ['white', 'gray.800'];
  const { fetchStroeUserProfile, userProfile } = useUsersStore(state => {
    return { fetchStroeUserProfile: state.fetchStroeUserProfile, userProfile: state.userProfile };
  });
  const textColor = useColorModeValue('gray.700', 'white');
  useEffect(() => {
    fetchStroeUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction={'column'}>
      <Center py={6}>
        <Box
          maxW={'90%'}
          w={'full'}
          bg={useColorModeValue(bgColor[0], bgColor[1])}
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
          <Flex mt={-12} justify={'center'}>
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
            <Stack spacing={0} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                Name: {authUser?.name}
              </Heading>
              <Text> Email: {authUser?.email}</Text>
              <Text> Phone: {authUser?.phone}</Text>
              {authUser?.is_admin && <Text> Status: Admin</Text>}
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
      <Center py={6}>
        <Flex direction={'column'} w={'90%'}>
          <Text fontSize="xl" color={textColor} fontWeight="bold" mb="10px">
            Your Orders
          </Text>
          <div>
            {userProfile?.orders?.map(order => {
              return (
                <Orders
                  key={order._id}
                  title={'order'}
                  description={'description'}
                  products={order.products}
                />
              );
            })}
          </div>
        </Flex>
      </Center>
    </Flex>
  );
}
