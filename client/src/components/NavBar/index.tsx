import { ReactNode } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  Button,
  Img
} from '@chakra-ui/react';
import { FiHome, FiMenu, FiBell, FiChevronDown, FiShoppingCart } from 'react-icons/fi';
import { HiShoppingBag } from 'react-icons/hi';
import { AiFillDashboard } from 'react-icons/ai';
import { IconType } from 'react-icons';
import { BsMoonStarsFill } from 'react-icons/bs';
import { FaSun } from 'react-icons/fa';

import useAuthStore from 'store/authStore';
import useCartStore from 'store/cartStore';
import ProductFilters from './ProductFilters';
import DashLinks from './DashLinks';

import './side-bar.css';

// interface LinkItemProps {shop
//   name: string;
//   icon: IconType;
//   link?: string;
// }

// const LinkItems: Array<LinkItemProps> = [
//   // { name: 'Home', icon: FiHome, link: '/' },
//   { name: 'Products', icon: HiShoppingBag, link: 'products' }
//   // { name: 'Trending', icon: FiTrendingUp },
//   // { name: 'Explore', icon: FiCompass },
//   // { name: 'Favourites', icon: FiStar },
//   // { name: 'Settings', icon: FiSettings }
// ];

const Logo = 'Watchers';

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const isProductsPage = useLocation().pathname === '/products';
  const isDashboardPage = useLocation().pathname.includes('/dashboard');
  const authUser = useAuthStore(state => state.authUser);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: '80%', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" px={'2rem'} justifyContent="space-between">
        <Link as={RouterLink} to="./">
          <Img src="watchers-logo.png" alt={`${Logo} logo`} width={'60px'} />
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <>
        <NavItem key={'Home'} icon={FiHome} link={'/'} onClose={onClose}>
          {'Home'}
        </NavItem>
      </>
      {authUser?.is_admin && (
        <>
          <NavItem key={'Dashboard'} icon={AiFillDashboard} link={'dashboard'}>
            {'Admin Dashboard'}
          </NavItem>

          {isDashboardPage && <DashLinks onClose={onClose} />}
        </>
      )}
      <>{isProductsPage && <ProductFilters />}</>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  link?: string;
  children: ReactNode;
  onClose?: () => void;
}
const NavItem = ({ icon, link, onClose, children }: NavItemProps) => {
  return (
    <Link
      onClick={onClose}
      as={RouterLink}
      to={link}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue('gray.200', 'blue.700')
        }}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate();

  const { clearAuth, authUser, setUserToEdit } = useAuthStore();

  const { cartCount, clearCartStore } = useCartStore(state => {
    return { cartCount: state.cartCount(), clearCartStore: state.clearCartStore };
  });

  const { colorMode, toggleColorMode } = useColorMode();

  const signOut = () => {
    clearAuth();
    clearCartStore();
  };
  const signIn = () => {
    navigate('login');
  };

  const goProfile = () => {
    setUserToEdit(null);
    navigate('profile');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      bg={useColorModeValue('white', 'gray.900')}
      // borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Link as={RouterLink} to="./">
        <Img
          display={{ base: 'flex', md: 'none' }}
          src="watchers-logo.png"
          alt={`${Logo} logo`}
          width={'60px'}
        />
      </Link>

      {/* <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        {Logo}
      </Text> */}

      <HStack spacing={{ base: '2', md: '6' }}>
        <NavItem key={'Products'} icon={HiShoppingBag} link={'products'}>
          {'Shop'}
        </NavItem>

        <Button onClick={toggleColorMode} bg={useColorModeValue('darkblue', 'black')}>
          {colorMode === 'light' ? (
            <Icon color="white" as={BsMoonStarsFill} />
          ) : (
            <Icon color="yellow.300" as={FaSun} />
          )}
        </Button>
        <Button>
          <span>
            <Icon
              onClick={() => navigate('/cart')}
              as={FiShoppingCart}
              h={12}
              w={7}
              alignSelf={'center'}
              color={cartCount ? 'dodgerblue' : 'white'}
            />
          </span>
          <span>{cartCount || ''}</span>
        </Button>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'sm'} src={String(authUser?.image)} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{authUser ? authUser?.name : 'Guest'}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {authUser ? authUser?.status : 'Guest'}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={goProfile}>Profile</MenuItem>
              <MenuDivider />
              <MenuItem>
                {' '}
                <Icon as={FiBell} />
              </MenuItem>

              {/* <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              {authUser ? (
                <MenuItem onClick={signOut}>Sign out</MenuItem>
              ) : (
                <MenuItem onClick={signIn}>Sign in</MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
