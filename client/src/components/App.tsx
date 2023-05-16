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

const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Sidebar>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/home'} element={<Home />} />
            <Route
              path={'/dashboard'}
              element={
                <ProtectFor rule={'admin'}>
                  <Dashboard />
                </ProtectFor>
              }
            />

            <Route
              path={'/products'}
              element={
                <ProtectFor rule={'user'}>
                  <Products />
                </ProtectFor>
              }
            />
            {/* verify-email */}
            <Route
              path={'/verify-email'}
              element={
                <ProtectFor rule={'guest'}>
                  <VerifyEmail />
                </ProtectFor>
              }
            />
            <Route
              path={'/login'}
              element={
                <ProtectFor rule={'guest'}>
                  <SignIn />
                </ProtectFor>
              }
            />
            <Route
              path={'/signup'}
              element={
                <ProtectFor rule={'guest'}>
                  <SignUp />
                </ProtectFor>
              }
            />
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