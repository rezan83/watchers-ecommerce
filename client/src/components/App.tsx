import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from 'components/SideBar';
import Home from 'pages/Home';
import Products from 'pages/Products';
import Dashboard from 'pages/Dashboard';
import SignIn from './Auth/SignIn';
import ProtectFor from './HOCs/ProtectFor';
import theme from 'config/theme';
import SignUp from './Auth/SignUp';
import VerifyEmail from './Auth/VerifyEmail';
import Profile from 'pages/Profile';
import ProfileEdit from './Auth/ProfileEdit';
import Users from 'pages/Dashboard/Users';

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
                <ProtectFor rule={'admin'}>
                  <Dashboard />
                </ProtectFor>
              }>
              <Route path={'users'} element={<Users />} />
            </Route>
            <Route
              path={'products'}
              element={
                <ProtectFor rule={'user'}>
                  <Products />
                </ProtectFor>
              }
            />
            <Route
              path={'profile'}
              element={
                <ProtectFor rule={'user'}>
                  <Profile />
                </ProtectFor>
              }
            />
            <Route
              path={'edit-profile'}
              element={
                <ProtectFor rule={'user'}>
                  <ProfileEdit />
                </ProtectFor>
              }
            />
            <Route
              path={'verify-email'}
              element={
                <ProtectFor rule={'guest'}>
                  <VerifyEmail />
                </ProtectFor>
              }
            />
            <Route
              path={'login'}
              element={
                <ProtectFor rule={'guest'}>
                  <SignIn />
                </ProtectFor>
              }
            />
            <Route
              path={'signup'}
              element={
                <ProtectFor rule={'guest'}>
                  <SignUp />
                </ProtectFor>
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