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
      console.log('successfully logged out');
      this.setState({redirect: true})

    })
    .catch(err => {console.log(err);})
  }

  componentDidMount() {
    this.checkAuth();
  }



  render() {

    if (this.state.redirect) {
      return (<Redirect to="/" />)
    }
    else
    return (

      <div className="row no-gutters">
        <div className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='nav navbar-nav'>


        <Link className="nav-item nav-link ml-lg-5" to="/users/">Dashboard (all users)</Link>

        <Link className="nav-item nav-link" to="/recipes/">Explore</Link>







        <div className="profile-link">
        <Link className="nav-item nav-link ml-lg-3" to="/profile/create/">Create Profile</Link>
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
