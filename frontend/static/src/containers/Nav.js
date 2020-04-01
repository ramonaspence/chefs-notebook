import React, {Component} from 'react';
import '../App.css';
import { Link, Redirect} from 'react-router-dom';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class Nav extends Component {
  constructor(props) {
    super(props);

      this.state = {
        redirect: null,
        isAuthenticated: false,
      }
    this.checkAuth = this.checkAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  checkAuth() {
    if (localStorage.getItem('current-user')) {
      this.setState({isAuthenticated: true})
    }
    else {
      return
    }
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
      console.log('successfully logged out')
      this.setState({redirect: true})})

    .catch(err => {console.log(err);})
  }

  componentDidMount() {
    this.checkAuth();
  }



  render() {
    if (this.state.redirect) {
      return (<Redirect to="/" />)
    }
    return (

      <div className="row">
        <div id="nav-bar" className='navbar navbar-expand-lg navbar-dark navbar-background'>
          <div id="navlinks" className='nav navbar-nav'>

          <div className="col-4">
            <Link className="nav-item nav-link ml-lg-5" to="/dashboard/">Dashboard</Link>

            <Link className="nav-item nav-link" to="/recipes/">Explore</Link>
          </div>
        <div className="nav-title col-4">
          <span>Chef's Notebook</span>
        </div>





        <div className="profile-link col-4">
        <Link className="nav-item nav-link ml-lg-3" to='/profile/'>Profile</Link>
        {this.state.isAuthenticated
        ?
        <Link className="nav-item nav-link ml-lg-3" to="/logout" onClick={this.handleLogout}>Logout</Link>
        :
        null
        }
        </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Nav;
