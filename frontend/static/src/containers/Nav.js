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
    axios.post(`${BASE_URL}/rest-auth/logout/`, {
      headers: {
        'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`}
      })
    .then(res => {
      localStorage.removeItem('current-user')
      window.location.reload(false);
    })
    .catch(err => {console.log(err);})
  }


  render() {
    return (
      <div className="row no-gutters">
        <div className='col-12 navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='nav navbar-nav'>
          <div className='left'>
        <Link className="nav-item nav-link" to="/">Home</Link>

        <Link className="nav-item nav-link" to="/recipes/">Recipes</Link>

        <Link className="nav-item nav-link" to="/add/recipe/">Create Recipe</Link>

        <Link className="nav-item nav-link" to="/login">Login</Link>

        <Link className="nav-item nav-link" to="/logout" onClick={this.handleLogout}>Logout</Link>

        <Link className="nav-item nav-link" to="/signup">Sign Up</Link>
        </div>

        <div className='right'>

        <form className="search form-inline ml-5">
          <input className="form-control mr-lg-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form>

        <Link className="nav-item nav-link ml-lg-5" to="/profile/">Profile</Link>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Nav;
