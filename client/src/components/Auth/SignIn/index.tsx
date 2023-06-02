import { useState } from 'react';
import { Link as ReactRouter, useNavigate, useParams } from 'react-router-dom';
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

import axiosInstance from 'api/axiosInterceptors';
import useAuthStore from 'store/authStore';
import env from 'config/env';
import Notifyer from 'components/Notifyer';

export default function SignIn() {
  const { success } = useParams();
  console.log({ success });
  const navigate = useNavigate();

  const setAuthUser = useAuthStore(state => state.setAuthUser);
  const setToken = useAuthStore(state => state.setToken);
  const setRefreshToken = useAuthStore(state => state.setRefreshToken);

  const [isForgetPass, setIsForgetPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const submitLogin = async () => {
    if (email && password) {
      try {
        const url = isForgetPass ? env.FORGET_URL : env.LOGIN_URL;
        const submitAuth = await axiosInstance.post(url!, {
          email,
          password
        });

        const authData = await submitAuth.data;

        if (!isForgetPass) {
          const { user, accessToken, refreshToken } = authData;
          setAuthUser(user);
          setToken(accessToken);
          setRefreshToken(refreshToken);
          setEmail('');
          setPass('');
        } else {
          navigate('/verify-email');
        }
        setIsForgetPass(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        {success && <Notifyer title={'success, now login please'} status={'success'} />}
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>
            {isForgetPass ? 'Set a new password' : 'Sign in to your account'}
          </Heading>
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
              <FormLabel>{isForgetPass && 'New '}Password</FormLabel>
              <Input type="password" value={password} onChange={e => setPass(e.target.value)} />
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={submitLogin}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500'
                }}>
                {isForgetPass ? 'Submit' : 'Sign in'}
              </Button>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'} onClick={() => setIsForgetPass(perv => !perv)}>
                  {isForgetPass ? 'Just Login' : 'Forgot password?'}
                </Link>
              </Stack>

              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Text>
                  No Account?{' '}
                  <Link as={ReactRouter} to={'/signup'} color={'blue.400'}>
                    Register
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
