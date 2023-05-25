import { Outlet } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <>
      <Box p={4}>
        <Outlet />
      </Box>
    </>
  );
}
