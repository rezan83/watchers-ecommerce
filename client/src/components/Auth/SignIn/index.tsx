import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage
} from '@chakra-ui/react';
import axiosInstance from 'helpers/intercepter';
import useAuthStore from 'store';
import { useNavigate } from 'react-router-dom';

export default function SIgnIn() {
  const setUser = useAuthStore(state => state.setUser);
  const setToken = useAuthStore(state => state.setToken);
  const setRefreshToken = useAuthStore(state => state.setRefreshToken);
  const navigate = useNavigate();
  const [email, setEmail] = useState('rezan.moh83@gmail.com');
  const [password, setPass] = useState('bobobobobobo');
  const submitLogin = () => {
    if (email && password) {
      axiosInstance
        .post(process.env.REACT_APP_LOGIN_URL || '', {
          email,
          password
        })
        .then(res => {
          const { user, accessToken , refreshToken} = res.data;
          setUser(user);
          setToken(accessToken);
          setRefreshToken(refreshToken);
          navigate('/');
        })
        .catch(err => {
          console.log(err);
        });

      setEmail('');
      setPass('');
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={!email} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              <FormErrorMessage>Email is required.</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!password} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={e => setPass(e.target.value)} />
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={submitLogin}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500'
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
