import React, {Component} from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class Nav extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this)

  }

  handleLogout(e) {
    e.preventDefault();
    axios.post(`${BASE_URL}/rest-auth/logout/`,)
    .then(res => {
      console.log(res, res.data);
      alert(res.data.detail);
    })
    .catch(err => {console.log(err);})
  }


  render() {
    return (
      <div className="row no-gutters">
        <ul>
        <Link to="/">
          <li>
            Home
          </li>
        </Link>
        <Link to="/login">
          <li>
            Login
          </li>
        </Link>
        <Link to="/logout" onClick={this.handleLogout}>
          <li>
            Logout
          </li>
        </Link>
        <Link to="/signup">
          <li>
          Sign Up
          </li>
        </Link>

        </ul>
      </div>
    )
  }
}

export default Nav;
