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
        <div className="col-12 signup-div">
          <span>Sign up and start sharing your recipes today!</span>
          <Link className="nav-item nav-link" to="/signup">Sign Up</Link>
        </div>
      
        <Link className="nav-item nav-link" to="/login">Login</Link>


      </div>
      </React.Fragment>
    )
  }
}

export default Home;
