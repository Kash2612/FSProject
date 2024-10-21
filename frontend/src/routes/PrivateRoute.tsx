
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useAuth();
  console.log(token); 

  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to='/login' replace />;
  }
};

export default PrivateRoute;
