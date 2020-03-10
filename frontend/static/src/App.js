import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Signup from './components/Signup.js';
import Login from './components/Login.js';
import Nav from './containers/Nav.js';
import Home from './containers/Home.js';
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
      <Router>
        <div className='container-fluid'>
          <Nav />
          <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
