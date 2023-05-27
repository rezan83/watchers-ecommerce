import { Outlet, useLocation } from 'react-router-dom';

import { Box } from '@chakra-ui/react';
import SalesMap from 'components/Charts/SalesMap';

export default function Dashboard() {
  const isMainDashPage = useLocation().pathname  === '/dashboard'
  return (
    <>
      <Box p={4}>
        {isMainDashPage && <SalesMap />}
        <Outlet />
      </Box>
    </>
  );
}
