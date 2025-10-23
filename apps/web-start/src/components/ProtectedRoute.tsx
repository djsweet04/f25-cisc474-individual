import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0();
  const [hasTriggeredLogin, setHasTriggeredLogin] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasTriggeredLogin) {
      setHasTriggeredLogin(true);
      loginWithRedirect().catch(console.error);
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) return <p>Loading authentication...</p>;
  if(error) return <p>Error: {error.message}</p>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
};
