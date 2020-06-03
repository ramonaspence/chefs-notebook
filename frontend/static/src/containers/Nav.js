import React, {Component} from 'react';
import '../App.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGriplines } from '@fortawesome/free-regular-svg-icons'

import checkAuthentication from '../utils/checkLoggedIn.js';

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
    const loggedIn = checkAuthentication();
    this.setState({isAuthenticated: loggedIn})

  }



  render() {
    if (this.state.redirect) {
      return (<Redirect to="/" />)
      //redirects to homepage after logging out
    }
    return (

      <div className="row">
        <div id="nav-bar" className='navbar navbar-expand-md navbar-dark navbar-background col-lg-12'>
            <div id="navlinks" className='nav navbar-nav col-12'>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1">
                  <span className="navbar-toggler-icon"></span>
                </button>
              <div className="collapse navbar-collapse" id="navbar1">
                <div className="dashboard-link-parent mr-auto col-sm-2 offset-lg-1">
                  <div className="dashboard-links mr-sm-auto ml-auto col-sm-2 offset-lg-1">
                    <Link className="nav-item nav-link" to="/dashboard/">Dashboard</Link>
                  </div>
                  <div className="dashboard-links mr-sm-auto ml-auto col-sm-2 offset-lg-1">
                    <Link className="nav-item nav-link" to="/recipes/">Explore</Link>
                  </div>
                </div>


                <div className="nav-title">
                  <span>Chef's Notebook</span>
                </div>




                <div className="profile-link-parent col-sm-2 offset-lg-1 mr-auto">
                  <div className="profile-link  col-sm-2 offset-lg-1">
                    <Link className="nav-item nav-link" to='/profile/'>Profile</Link>
                  </div>
                    {this.state.isAuthenticated
                      ?
                      <div className="profile-link col-sm-2 offset-lg-1">
                        <Link className="nav-item nav-link" to="/logout" onClick={this.handleLogout}>Logout</Link>
                      </div>
                      :
                      null
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Nav;
