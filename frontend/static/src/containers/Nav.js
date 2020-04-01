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
        <div id="nav-bar" className='navbar navbar-expand-lg navbar-dark navbar-background col-lg-12'>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbar1">
            <div id="navlinks" className='nav navbar-nav col-lg-12 col-2'>

              <div className="dashboard-links col-lg-2 col-12 offset-lg-1">
                <Link className="nav-item nav-link mr-lg-3" to="/dashboard/">Dashboard</Link>
              </div>
              <div className="dashboard-links col-lg-2 col-12 offset-lg-1">
                <Link className="nav-item nav-link mr-lg-3" to="/recipes/">Explore</Link>
              </div>


              <div className="nav-title">
                <span>Chef's Notebook</span>
              </div>





              <div className="profile-link col-12 col-lg-2 offset-lg-1">
                <Link className="nav-item nav-link ml-lg-3" to='/profile/'>Profile</Link>
              </div>
                {this.state.isAuthenticated
                  ?
                  <div className="profile-link col-12 col-lg-2">
                    <Link className="nav-item nav-link ml-lg-3" to="/logout" onClick={this.handleLogout}>Logout</Link>
                  </div>
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
