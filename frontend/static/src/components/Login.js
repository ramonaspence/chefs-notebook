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

    this.logIn = this.logIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }


  render() {
    return (
      <div className="card-body">
      <form method="post" type="submit" onSubmit={this.logIn}/>
        <label htmlFor="username">Username:</label>
          <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
        <label htmlFor="password">Password:</label>
          <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
        <button>Log In</button>
      </div>
    )
  }
}
