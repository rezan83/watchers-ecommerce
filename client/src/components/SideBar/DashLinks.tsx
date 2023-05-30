import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, useColorModeValue, VStack } from '@chakra-ui/react';
import useCartStore from 'store/cartStore';

interface ILink {
  name: string;
  link: string;
  onClick?: () => void;
}

const NavLink: FC<ILink> = ({ link, name, onClick }) => (
  <Link
    onClick={onClick}
    as={RouterLink}
    to={link}
    w={'full'}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'blue.700')
    }}>
    {name}
  </Link>
);

const DashLinks = () => {
  const setProductToEdit = useCartStore(state => state.setProductToEdit);
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} border={'solid 1px gray'}>
      <VStack as={'nav'} spacing={4} display={'flex'} alignItems={'start'}>
        <NavLink link={'/dashboard/users'} name={'Users'} />
        <NavLink
          onClick={() => setProductToEdit(null)}
          link={'/dashboard/add-products'}
          name={'Add/ Edit Products'}
        />
      </VStack>
    </Box>
  );
};

export default DashLinks;
