import React from 'react';
import { Loader, Alert } from '@mantine/core';

interface QueryDataWrapperProps {
  isLoading: boolean;
  error: unknown;
  children: React.ReactNode;
}

export const QueryDataWrapper: React.FC<QueryDataWrapperProps> = ({
  isLoading,
  error,
  children,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert color="red">
        {error instanceof Error ? error.message : String(error)}
      </Alert>
    );
  }

  return <>{children}</>;
};
