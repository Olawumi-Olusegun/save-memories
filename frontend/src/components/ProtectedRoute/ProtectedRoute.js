import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...Rest }) => {
      const userProfile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : false;
      const isAuthenticated = userProfile?.userprofile?.isAdmin;
      return <Route {...Rest} render={(props) => !isAuthenticated ? (<Redirect to="/auth" />) : (<Component {...props} />)} />
}

export default ProtectedRoute;
