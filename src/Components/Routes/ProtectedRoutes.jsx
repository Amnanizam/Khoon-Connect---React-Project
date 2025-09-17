import React from 'react'
import { Navigate } from 'react-router'

const ProtectedRoutes = ({ children }) => {
  // Check login status from localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // If not logged in → redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise → show the protected page
  return children;
};
    


export default ProtectedRoutes
