import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectorsAuth } from '../../redux/auth';

export default function PrivateRoute({ children, ...routeProps }) {
  const isAuthenticated = useSelector(selectorsAuth.getIsAuthenticated);
  return (
    <Route {...routeProps}>
      {isAuthenticated ? children : <Redirect to={routeProps.redirectTo} />}
    </Route>
  );
}
