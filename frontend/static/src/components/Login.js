import React, {Component} from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom';


import Nav from '../containers/Nav.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',

    }

    this.captureLogin = this.captureLogin.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});

  }

  captureLogin() {
    axios.get(`${BASE_URL}/rest-auth/user/`,)
    .then(res => {
      localStorage.setItem('currentUser', JSON.stringify({username: res.data.username, userid: res.data.pk}));
    })
    .catch(err => console.log(err));
  }

  handleLogin(e) {
    e.preventDefault();


    axios.post(`${BASE_URL}/rest-auth/login/`, this.state)
    .then(res => {localStorage.setItem('current-user', JSON.stringify(res.data))
      this.captureLogin()
      this.props.history.push('/users/')})
    .catch(err => {console.log(err)})

  }

  render() {
    return (
      <React.Fragment>
      <Nav />
    <div className="card-body">
      <form method="post" type="submit" onSubmit={this.handleLogin}>
        <label htmlFor="username">Username:</label>
          <input type="text" value={this.state.username} autoComplete="username" name="username" onChange={this.handleChange} />
        <label htmlFor="password">Password:</label>
          <input type="password" value={this.state.password} autoComplete="current-password" name="password" onChange={this.handleChange} />
        <button>Log In</button>
      </form>
    </div>
    </React.Fragment>

  )}
  }
}

export default Login;
