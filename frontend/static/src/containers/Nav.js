import React, {Component} from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class Nav extends Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this)

  }

  logOut(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/rest-auth/logout/',)
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
        <Link to="/logout">
          <li>
            <a onClick={this.logOut} href="#">Logout</a> //get request to logout
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
