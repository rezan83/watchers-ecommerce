import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

const Notifyer = ({
  title,
  description,
  status = 'info'
}: {
  title: string;
  description?: string;
  status?: 'success' | 'error' | 'warning' | 'info';
}) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default Notifyer;
