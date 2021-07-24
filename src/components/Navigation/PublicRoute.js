import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { selectorsAuth } from '../../redux/auth';

export default function PublicRoute({ children, ...routeProps }) {
  const isAuthenticated = useSelector(selectorsAuth.getIsAuthenticated);
  return (
    <Route {...routeProps}>
      {isAuthenticated && routeProps.restricted ? (
        <Redirect to={routeProps.redirectTo} />
      ) : (
        children
      )}
    </Route>
  );
}
