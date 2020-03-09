import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import Signup from './components/Signup.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component {
  constructor() {
    super();

    this.state = {
      showComponent: '',
    }

  }
  render() {
    return(
      <div className='container-fluid'>
      <Router>

        <div className='row no-gutters'>
          <nav className="navbar navbar-expand-lg">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">Login</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
              </li>
            </ul>
          </nav>
        </div>


        <Signup />


      </Router>
      </div>
    )
  }
}

export default App;
