import React, {Component} from 'react';
import '../App.css';

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
    axios.get(`${BASE_URL}/rest-auth/user/`,)
    .then(res => {
      localStorage.setItem('currentUser', JSON.stringify({username: res.data.username, userid: res.data.pk}))
      console.log(res);
    })
    .catch(err => console.log(err));
  }

  handleLogin(e) {
    e.preventDefault();


    axios.post(`${BASE_URL}/rest-auth/login/`, this.state)
    .then(res => {localStorage.setItem('current-user', JSON.stringify(res.data))
      this.captureLogin()})
    .then(this.props.props.history.push('/users/'))
    .catch(err => {console.log(err)})

  }

  render() {
    console.log('login', this.props);
    return (
      <React.Fragment>
    <div className="card-body">
      <form method="post" type="submit" onSubmit={this.handleLogin}>
        <div className="form-group">
          <input type="text" value={this.state.username} autoComplete="username" placeholder="username" name="username" onChange={this.handleChange} />
        </div>
          <input type="password" value={this.state.password} autoComplete="current-password" name="password" onChange={this.handleChange} />
          <button className="home-button">Login</button>
          <button onClick={this.handleSwitch} className="switch">Signup</button>
      </form>
    </div>
    </React.Fragment>

  )
  }
}


export default Login;
