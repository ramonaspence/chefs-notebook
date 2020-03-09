import React, {Component} from 'react';
import '../App.css';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});

  }

  handleLogin(e) {
    // e.preventDefault();
    console.log('hello');
    axios.post('http://localhost:3000/rest-auth/login', this.state,)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {console.log(err);})
  }

  render() {
    return (
      <div className="card-body">
      <form method="post" type="submit" onSubmit={this.handleLogin} />
        <label htmlFor="username">Username:</label>
          <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
        <label htmlFor="password">Password:</label>
          <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
        <button>Log In</button>
      </div>
    )
  }
}

export default Login;
