import React, {Component} from 'react';
import '../App.css';



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

    console.log(this.state);
    axios.post(`${BASE_URL}/rest-auth/registration/`, this.state,)
    .then(res => {
      localStorage.setItem('current-user', JSON.stringify(res.data));
      this.props.props.history.push('/profile/create/');

    })
    .catch(err => {console.log(err);})
  }

  render() {
    return (
      <React.Fragment>

      <div className="card-body">
        <form method="post" type="submit" onSubmit={this.signUp}>
          <div className="form-group">
            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="email" autoComplete="email" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="password" name="password1" placeholder="password" autoComplete="new-password" value={this.state.password1} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="password" name="password2" placeholder="repeat password" autoComplete="new-password" value={this.state.password2} onChange={this.handleChange} />
          </div>
          <div className="login-buttons">
            <button className="home-button">Signup</button>
            <button className="switch">Login</button>
          </div>

        </form>
      </div>
      </React.Fragment>
    )
  }
}

export default Signup;
