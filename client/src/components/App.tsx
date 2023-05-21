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
import ProfileEdit from './Auth/ProfileEdit';
import Users from 'pages/Dashboard/Users';
import AddProducts from 'pages/Dashboard/AddProducts';

const App = () => {
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

// authRoute.post('/register', authControllers.registerUser)
// authRoute.post('/login', authControllers.loginUser)
// authRoute.post('/refresh', authControllers.refreshUser)
// authRoute.post('/logout', authControllers.logoutUser)
// authRoute.post('/forget-password', authControllers.forgetPassword)
// authRoute.get('/verify/:token', authControllers.verifyUser)
// authRoute.get('/verify-password/:token', authControllers.verifyPassword)

// usersRoute.get('/:id', isLogedIn, userControllers.fetchOneUser)
// usersRoute.put('/', isLogedIn, userControllers.updateOneUser)
// usersRoute.delete('/', isLogedIn, userControllers.deleteOneUser)
// usersRoute.post('/profile', isLogedIn, userControllers.userProfile)


// adminRoute.get(
//   '/all-users',
//   isLogedIn,
//   isAddmin,
//   adminControllers.fetchAllUsers
// )
// adminRoute.get('/:id', isLogedIn, isAddmin, adminControllers.fetchOneUser)

// adminRoute.get('/', isLogedIn, isAddmin, adminControllers.admin)
// adminRoute.delete('/:id', isLogedIn, isAddmin, adminControllers.deleteOneUser)
// adminRoute.put('/ban/:id', isLogedIn, isAddmin, adminControllers.banUser)
// adminRoute.put('/unban/:id', isLogedIn, isAddmin, adminControllers.unbanUser)