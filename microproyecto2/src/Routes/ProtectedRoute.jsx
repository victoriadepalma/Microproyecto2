import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user,loading } = UserAuth();
console.log(user)
  if (!loading && user==null) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;