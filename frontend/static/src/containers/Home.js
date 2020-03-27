import React, {Component} from 'react';
import '../App.css';
import Nav from '../containers/Nav.js';

import {Link} from 'react-router-dom';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    }
  }


  render() {
    return (
      <React.Fragment>
      <Nav />
      <div className="row no-gutters">

        <Link className="nav-item nav-link" to="/login">Login</Link>
        <Link className="nav-item nav-link" to="/signup">Sign Up</Link>
      </div>
      </React.Fragment>
    )
  }
}

export default Home;
