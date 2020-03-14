import React, {Component} from 'react';
import '../App.css';

import {Redirect} from 'react-router-dom';
import ProfileCreate from './ProfileCreate.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',

    }

    this.signUp = this.signUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  signUp(e) {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append('username', this.state.username);
    // formData.append('email', this.state.email);
    // console.log(formData);

    console.log(this.state);
    axios.post(`${BASE_URL}/rest-auth/registration/`, this.state,)
    .then(res => {
      localStorage.setItem('current-user', JSON.stringify(res.data));
      this.setState({redirect: true});

    })
    .catch(err => {console.log(err);})
  }

  render() {
    if (this.state.redirect === true) {
      return (
        <Redirect to="/profile/create" />
      )
  } else
    return (
      <div className="card-body">
        <form method="post" type="submit" onSubmit={this.signUp}>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password1" value={this.state.password1} onChange={this.handleChange} />
          <label htmlFor="password_2">Password Confirm:</label>
          <input type="password" name="password2" value={this.state.password2} onChange={this.handleChange} />
          <button className="btn btn-outline-success">Register</button>
        </form>
      </div>

    )
  }
}

export default Signup;
