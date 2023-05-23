import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from 'components/SideBar';
import Home from 'pages/Home';
import Products from 'pages/Products';
import Dashboard from 'pages/Dashboard';
import SignIn from './Auth/SignIn';
import ProtectRouteFor from './HOCs/ProtectRouteFor';
import theme from 'config/theme';
import SignUp from './Auth/SignUp';
import VerifyEmail from './Auth/VerifyEmail';
import Profile from 'pages/Profile';
import ProfileEdit from './ProfileEdit';
import Users from 'pages/Dashboard/Users';
import AddProducts from 'pages/Dashboard/AddProducts';
import ProductDetails from './ProductDetails';
import { useEffect } from 'react';
import useProductsStore from 'store/productsStrore';

const App = () => {
  const fetchStoreProducts = useProductsStore(state => state.fetchStoreProducts);
  const priceFilter = useProductsStore(state => state.priceFilter);
  const nameFilter = useProductsStore(state => state.nameFilter);
  const limit = useProductsStore(state => state.limit);
  const page = useProductsStore(state => state.page);


  useEffect(() => {
    console.log("home effect")
       fetchStoreProducts(priceFilter, nameFilter, limit, page);
     
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [ priceFilter, nameFilter, limit, page]);

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Sidebar>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'home'} element={<Home />} />
            <Route
              path={'dashboard'}
              element={
                <ProtectRouteFor rule={'admin'}>
                  <Dashboard />
                </ProtectRouteFor>
              }>
              <Route path={'users'} element={<Users />} />
              <Route path={'add-products'} element={<AddProducts />} />
            </Route>
            <Route
              path={'cart'}
              element={
                <ProtectRouteFor rule={'user'}>
                  <Products cart/>
                </ProtectRouteFor>
              }
            />
             <Route
              path={'product-details'}
              element={
                <ProtectRouteFor rule={'user'}>
                  <ProductDetails />
                </ProtectRouteFor>
              }
            />
            <Route
              path={'products'}
              element={
                <ProtectRouteFor rule={'user'}>
                  <Products />
                </ProtectRouteFor>
              }
            />
            <Route
              path={'profile'}
              element={
                <ProtectRouteFor rule={'user'}>
                  <Profile />
                </ProtectRouteFor>
              }
            />
            <Route
              path={'edit-profile'}
              element={
                <ProtectRouteFor rule={'user'}>
                  <ProfileEdit />
                </ProtectRouteFor>
              }
            />
            <Route
              path={'verify-email'}
              element={
                <ProtectRouteFor rule={'guest'}>
                  <VerifyEmail />
                </ProtectRouteFor>
              }
            />
            <Route
              path={'login'}
              element={
                <ProtectRouteFor rule={'guest'}>
                  <SignIn />
                </ProtectRouteFor>
              }
            />
            <Route
              path={'signup'}
              element={
                <ProtectRouteFor rule={'guest'}>
                  <SignUp />
                </ProtectRouteFor>
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </Sidebar>
      </ChakraProvider>
    </BrowserRouter>
  );
};
export default App;