import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from 'components/SideBar';
import Home from 'pages/Home';
import Products from 'pages/Products';
import Dashboard from 'pages/Dashboard';
import SignIn from './Auth/SignIn';
import ProtectFor from './HOCs/ProtectFor';

const App = () => {
  console.log(document.cookie)
  return (
    <BrowserRouter>
      <ChakraProvider>
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
            <Route
              path={'/login'}
              element={
                <ProtectFor rule={'guest'}>
                  <SignIn />
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
