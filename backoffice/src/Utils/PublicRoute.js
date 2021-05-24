import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the public routes
function PublicRoute({ component: Component, setisLogged:setisLogged ,...rest }) {
  return (
    <Route
      render={(props) => !getToken() ? <Component setisLogged={setisLogged} {...props} /> : <Redirect to={{ pathname: '/candidaturas' }} />}
    />
  )
}
 
export default PublicRoute;