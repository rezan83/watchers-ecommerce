import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, useColorModeValue, VStack } from '@chakra-ui/react';

interface ILink {
  link: {
    name: string;
    link: string;
  };
}
const Links = [
  { name: 'Users', link: '/dashboard/users' },
  { name: 'Add/ Edit Products', link: '/dashboard/add-products' }
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

const DashLinks = () => {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <VStack as={'nav'} spacing={4} display={'flex'} alignItems={'start'}>
        {Links.map(link => (
          <NavLink key={link.name} link={link} />
        ))}
      </VStack>
    </Box>
  );
};

export default DashLinks;
