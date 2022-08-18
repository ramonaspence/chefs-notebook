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
      badRequest: false,

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
    .catch(err => {
      console.log(err);
      if (err.response.status === 400) {
        this.setState({
          badRequest: true,
          badRequestResponse: err.response.data,
        })
      }
    })

  }

  render() {
    return (
      <React.Fragment>
        <form method="post" type="submit" onSubmit={this.handleSignUp}>
          <div className="card-body d-flex justify-content-center flex-column">
            <input className="form-group" type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
            {this.state.badRequest
            ?
              <small>{this.state.badRequestResponse['username']}</small>
            :
            null
            }
            <input className="form-group" type="email" name="email" placeholder="email" autoComplete="email" value={this.state.email} onChange={this.handleChange} />
            {this.state.badRequest 
            ?
              <small>{this.state.badRequestResponse['email']}</small>
            :
            null
            }
            <input className="form-group" type="password" name="password1" placeholder="password" autoComplete="new-password" value={this.state.password1} onChange={this.handleChange} />
            {this.state.badRequest
            ?
              <small>{this.state.badRequestResponse['password1']}</small>
            :
            null
            }
            <input className="form-group" type="password" name="password2" placeholder="password" autoComplete="new-password" value={this.state.password2} onChange={this.handleChange} />
            {this.state.badRequestResponse
            ?
              <small>{this.state.badRequestResponse['password2']}</small>
            :
            null
            }
            {this.state.badRequestResponse
            ?
            <small>{this.state.badRequestResponse.non_field_errors}</small>
            :
            null
            }
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
