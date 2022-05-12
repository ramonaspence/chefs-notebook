import React, {Component} from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class Login extends Component {
  constructor(props) {
    super(props);

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
    axios.get(`${BASE_URL}/dj-rest-auth/user/`,)
    .then(res => {
      localStorage.setItem('currentUser', JSON.stringify({username: res.data.username, userid: res.data.pk}))
    })
    .then(this.setState({redirect: true}))
    .catch(err => console.log(err))
  }

  handleLogin(e) {
    e.preventDefault();
    console.log('fires')
    axios.post(`${BASE_URL}/dj-rest-auth/login/`, this.state)
    .then(res => localStorage.setItem('current-user', JSON.stringify(res.data)))
    .then(res => this.captureLogin())
    .catch(err => {console.log(err)})
  }

  render() {
    if (this.state.redirect && localStorage.getItem('current-user')) {
      return (<Redirect to="/dashboard/" />);
    }
    return (
      <React.Fragment>
      <form method="post" type="submit" onSubmit={this.handleLogin}>
        <div className="card-body">
          <input className="form-group" type="text" value={this.state.username} autoComplete="username" placeholder="username" name="username" onChange={this.handleChange} />
          <input className="form-group" type="password" value={this.state.password} autoComplete="current-password" placeholder="password" name="password" onChange={this.handleChange} />
        </div>

        <div>
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </React.Fragment>

  )
  }
}
export default Login;
