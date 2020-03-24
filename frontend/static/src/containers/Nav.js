import React, {Component} from 'react';
import '../App.css';
import { Link, Redirect } from 'react-router-dom';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class Nav extends Component {
  constructor(props) {
    super(props);

      this.state = {
        redirect: null,
      }

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
      localStorage.removeItem('currentUser')
      window.location.reload(false)
      console.log('successfully logged out');
      this.setState({redirect: true})
    })
    .catch(err => {console.log(err);})
  }


  render() {
    if (this.state.redirect) {
      return (<Redirect to="/" />)
    }
    else
    return (
      <div className="row no-gutters">
        <div className='col-12 navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='nav navbar-nav'>
          <div className='left'>

        <Link className="nav-item nav-link ml-lg-5" to="/users/">All Users (dashboard)</Link>

        <Link className="nav-item nav-link" to="/recipes/">Explore</Link>

        <Link className="nav-item nav-link" to="/login">Login</Link>

        <Link className="nav-item nav-link" to="/logout" onClick={this.handleLogout}>Logout</Link>

        <Link className="nav-item nav-link" to="/signup">Sign Up</Link>
        </div>

        <div className='right'>


        <Link className="nav-item nav-link ml-lg-5" to='/profile/'>
        <img className="nav-avatar" src="" href="" />Profile</Link>
        <Link className="nav-item nav-link ml-lg-5" to="/profile/create/">Create Profile</Link>
        <div className='nav-item nav-link ml-lg-5'>Logged in as </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Nav;
