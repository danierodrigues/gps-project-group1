import React, {useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the private routes
function PrivateRoute({ component: Component, setisLogged: setisLogged, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component setisLogged={setisLogged} {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}
 
export default PrivateRoute;