import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Link, useHistory, Route, Redirect, withRouter } from 'react-router-dom';
import Candidatures from './components/Candidaturas/candidaturas';
import Universidades from './components/Universidades/universidades';
import Header from './components/Header/Header';
import Login from './components/Login/Login.js';
import './App.css';
import { ToastContainer } from 'react-toastify';
import {removeUserSession,getToken,setUserSession} from '../src/Utils/Common';
import PrivateRoute from '../src/Utils/PrivateRoute';
import PublicRoute from '../src/Utils/PublicRoute';
import {verifyToken} from '../src/services/api';
import Faqs from '../src/components/Faqs/faqs';

function App()  {
  const [authLoading, setAuthLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const history = useHistory();

  const handleChange = (newValue) => {
    setIsLogged(newValue);
  }

  const handleLogout = () => {
    removeUserSession();
    setIsLogged(false);
  }

  useEffect(() => {  
    const token = getToken();
    if (!token) {
      setIsLogged(false);
      return;
    }
    
    verifyToken(token).then(response => {
      if(response.ok){
        setUserSession(token);
        setIsLogged(true);

      }else{
        removeUserSession();
        setIsLogged(false);
        //setAuthLoading(false);

        
      }
      
      setAuthLoading(false);
    }).catch(error=>{
      removeUserSession();

      setIsLogged(false);
    })
    }, []);


    if (authLoading && getToken()) {
      return <div className="content">Checking Authentication...</div>
    }

    return (
      <Router>        
        {isLogged && (<Header handleLogout = {handleLogout}></Header>)}
        
        <div>
        <ToastContainer position='top-center'
            limit={1}
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
          <Switch>
              <Route exact path='/'><Redirect to='/login'></Redirect></Route>
              <PublicRoute exact path='/login' component={Login} setisLogged={handleChange}/>
              <PrivateRoute exact path='/universidades'  component={Universidades} setisLogged={handleChange} />
              <PrivateRoute exact path='/candidaturas'  component={Candidatures} setisLogged={handleChange} />
              <PrivateRoute exact path='/faqs' component={Faqs} setisLogged={handleChange} />
              <Route exact path='*'><Redirect to='/login'></Redirect></Route>
          </Switch>
        </div>
      </Router>
    );
  
}

export default App;
