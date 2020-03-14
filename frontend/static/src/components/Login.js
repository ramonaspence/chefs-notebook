import React, {Component} from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom';
import ProfileView from './ProfileView.js';

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
      redirect: 0
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});

  }

  handleLogin(e) {
    e.preventDefault();
    console.log(this.props);
    axios.post(`${BASE_URL}/rest-auth/login/`, this.state,)
    .then(res => {
      localStorage.setItem('current-user', JSON.stringify(res.data));
      console.log(res.data);
      this.setState({redirect: 1})


    })
    .catch(err => {console.log(err);})
  }

  render() {
    if (this.state.redirect === 1) {
      return(<Redirect to="/profiles/" />)
  } else {
    return (

    <div className="card-body">
      <form method="post" type="submit" onSubmit={this.handleLogin}>
        <label htmlFor="username">Username:</label>
          <input type="text" value={this.state.username} autoComplete="username" name="username" onChange={this.handleChange} />
        <label htmlFor="password">Password:</label>
          <input type="password" value={this.state.password} autoComplete="current-password" name="password" onChange={this.handleChange} />
        <button>Log In</button>
      </form>
    </div>



  )}
  }
}

export default Login;
