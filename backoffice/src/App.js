import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Candidaturas from './components/Candidaturas/candidaturas';
import Universidades from './components/Universidades/universidades';
import './App.css';

class App extends Component {
  render() {
    return (
    <Router>
        <div class="header">
          <a class="logo">BrightStart</a>
          <nav class="header-right">
            <a><Link to={'/'} className="nav-link">Candidaturas</Link></a>
            <a><Link to={'/Universidades'} className="nav-link">Universidades</Link></a>
            <a><Link to={'/candidaturas'} className="nav-link">Log out</Link></a>    
          </nav>
          <Switch>
              <Route exact path='/Universidades' component={Universidades} />
              <Route exact path='/' component={Candidaturas} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
