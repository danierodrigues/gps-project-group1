import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Link, useHistory, Route, Redirect } from 'react-router-dom';
import Candidatures from './components/Candidaturas/candidaturas';
import Universidades from './components/Universidades/universidades';
import Header from './components/Header/Header';
import Auth from './components/Auth/auth.js';
import './App.css';
import {removeUserSession,getToken,setUserSession} from '../src/Utils/Common';
import PrivateRoute from '../src/Utils/PrivateRoute';
import PublicRoute from '../src/Utils/PublicRoute';
import {verifyToken} from '../src/services/api';

function App()  {
  const [authLoading, setAuthLoading] = useState(false);
  const [isLogged, setisLogged] = useState(false);


  function handleChange(newValue) {
    setisLogged(newValue);
  }

  const HandleLogout = () => {
    removeUserSession();
    setisLogged(false);
  }

    useEffect(() => {  
    const token = getToken();
    if (!token) {
      setisLogged(false);
      return;
    }
    
    verifyToken(token).then(response => {
      if(response.ok){
        setUserSession(token);
        setisLogged(true);
      }else{
        removeUserSession();
        setisLogged(false);
      }
      setAuthLoading(false);
      
    }).catch(error=>{
      removeUserSession();
      setisLogged(false);
    })
    }, []);


    if (authLoading && getToken()) {
      return <div className="content">Checking Authentication...</div>
    }

    return (
    <Router>        
          {isLogged && (<Header handleLogout = {HandleLogout}></Header>)}
          
          <div className='margin-top-xl'>
            <Switch>
                <Route exact path="/"><Redirect to="/login"></Redirect></Route>
                <PublicRoute exact path='/login' component={Auth} setisLogged={handleChange}/>
                <PrivateRoute exact path='/universidades' component={Universidades} />
                <PrivateRoute exact path='/candidaturas' component={Candidatures} />
            </Switch>
          </div>
      </Router>
    );
  
}

export default App;
