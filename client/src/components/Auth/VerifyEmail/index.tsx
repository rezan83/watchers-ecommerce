import { Flex, Stack, Heading, useColorModeValue } from '@chakra-ui/react';

export default function VerifyEmail() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Please verify your email</Heading>
        </Stack>
      </Stack>
    </Flex>
  );
}
