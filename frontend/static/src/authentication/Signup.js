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

    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  captureLogin() {
    axios.get(`${BASE_URL}/dj-rest-auth/user/`, {
      headers: {
        'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
      }
    })
    .then(res => {
      localStorage.setItem('currentUser', JSON.stringify({username: res.data.username, userid: res.data.pk}))
      console.log(res);
    })
      .then(this.setState({redirect: true}))
    .catch(err => console.log(err))
  }

  handleSignUp(e) {
    e.preventDefault();
    axios.post(`${BASE_URL}/dj-rest-auth/registration/`, this.state,)
    .then(res => {
      localStorage.setItem('current-user', JSON.stringify(res.data));
      this.props.props.history.push('/profile/create/');
    })
    .then(res => this.captureLogin())
    .catch(err => {console.log(err);})

  }

  render() {
    return (
      <React.Fragment>
        <form method="post" type="submit" onSubmit={this.handleSignUp}>
          <div className="card-body d-flex justify-content-center flex-column">
            <input className="form-group" type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
            <input className="form-group" type="email" name="email" placeholder="email" autoComplete="email" value={this.state.email} onChange={this.handleChange} />
            <input className="form-group" type="password" name="password1" placeholder="password" autoComplete="new-password" value={this.state.password1} onChange={this.handleChange} />
            <input className="form-group" type="password" name="password2" placeholder="password" autoComplete="new-password" value={this.state.password2} onChange={this.handleChange} />
            <small className="d-block">passwords must match</small> 
          </div>

          <div  className="d-flex justify-content-center">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default Signup;
