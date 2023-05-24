import { FC } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

interface ILink {
  link: {
    name: string;
    link: string;
  };
}
const Links = [
  { name: 'Users', link: 'users' },
  { name: 'Add/ Edit Products', link: 'add-products' }
];

const NavLink: FC<ILink> = ({ link }) => (
  <Link
    as={RouterLink}
    to={link?.link}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700')
    }}>
    {link.name}
  </Link>
);

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={'center'}>
            <Link
              as={RouterLink}
              to={'/dashboard'}
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700')
              }}>
              <Box>Dashboard</Box>
            </Link>

            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map(link => (
                <NavLink key={link.name} link={link} />
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link.name} link={link} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>
        <Outlet />
      </Box>
    </>
  );
}
