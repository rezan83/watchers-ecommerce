import React, { ReactNode, useEffect, useState } from 'react';
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
  chakra,
  Tag,
  TagLabel,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderThumb,
  RangeSliderFilledTrack
} from '@chakra-ui/react';
import {
  FiHome,
  // FiTrendingUp,
  // FiCompass,
  // FiStar,
  // FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiShoppingCart
} from 'react-icons/fi';
import { HiShoppingBag } from 'react-icons/hi';
import { FaFilter } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconType } from 'react-icons';
import useAuthStore from 'store/authStore';
import useCartStore from 'store/cartStore';
import useProductsStore from 'store/productsStrore';

interface LinkItemProps {
  name: string;
  icon: IconType;
  link?: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, link: 'home' },
  { name: 'Products', icon: HiShoppingBag, link: 'products' }
  // { name: 'Trending', icon: FiTrendingUp },
  // { name: 'Explore', icon: FiCompass },
  // { name: 'Favourites', icon: FiStar },
  // { name: 'Settings', icon: FiSettings }
];

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
  const authUser = useAuthStore(state => state.authUser);
  const fetchStoreProducts = useProductsStore(state => state.fetchStoreProducts);
  const [priceFilter, setPriceFilter] = useState<number[] | null>(null);

  const priceFilterhandle = (minmax: number[]) => {
    setPriceFilter(minmax);
  };

  useEffect(() => {
    fetchStoreProducts(priceFilter);
  }, [priceFilter]);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {Logo}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {authUser?.is_admin && (
        <NavItem key={'Dashboard'} icon={AiFillDashboard} link={'dashboard'}>
          {'Dashboard'}
        </NavItem>
      )}
      {LinkItems.map(link => (
        <>
          <NavItem key={link.name} icon={link.icon} link={link.link}>
            {link.name}
          </NavItem>

          {link.name === 'Products' && isProductsPage && (
            <NavItem icon={FaFilter}>
              <Flex direction="column" w={'full'}>
                <>
                  <h4>Price</h4>
                  <RangeSlider
                    aria-label={['min', 'max']}
                    max={1000}
                    defaultValue={[0, 1000]}
                    step={25}
                    onChangeEnd={priceFilterhandle}>
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                  <p>{priceFilter ? `min:${priceFilter[0]} max:${priceFilter[1]}` : ''}</p>
                </>
              </Flex>
            </NavItem>
          )}
        </>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  link?: string;
  children: ReactNode;
}
const NavItem = ({ icon, link, children, ...rest }: NavItemProps) => {
  return (
    <Link
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
          bg: 'cyan.400',
          color: 'white'
        }}
        {...rest}>
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
  const clearAuth = useAuthStore(state => state.clearAuth);
  const authUser = useAuthStore(state => state.authUser);
  const cartCount = useCartStore(state => state.cartCount());

  const { colorMode, toggleColorMode } = useColorMode();
  const signOut = () => {
    clearAuth();
  };
  const signIn = () => {
    navigate('login');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        {Logo}
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />

        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Tag>
          <chakra.a href={'#'} display={'flex'}>
            <Icon
              onClick={() => navigate('/cart')}
              as={FiShoppingCart}
              h={7}
              w={7}
              alignSelf={'center'}
              color={cartCount ? 'dodgerblue' : 'white'}
            />
          </chakra.a>
          <TagLabel>{cartCount || ''}</TagLabel>
        </Tag>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
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
              <MenuItem>
                <Link as={RouterLink} to={'/profile'}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
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
