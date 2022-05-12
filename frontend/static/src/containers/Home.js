import React, {Component} from 'react';
import '../App.css';

import Login from '../authentication/Login.js';
import Signup from '../authentication/Signup.js';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const BASE_URL = process.env.REACT_APP_BASE_URL;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      hidenav: null,
      signUp: false,
      form: 'login'
    }
    this.handleChange = this.handleChange.bind(this)
    this.switchToLogin = this.switchToLogin.bind(this)
    this.switchToSignUp = this.switchToSignUp.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  switchToLogin() {
    this.setState({signUp: false})
  }
  
  switchToSignUp() {
    this.setState({signUp: true})
  }

  render() {
    return (
      <React.Fragment>
          <div id="nav-bar" className='row navbar navbar-expand-lg navbar-dark navbar-background col-12'>
            <div className="nav-title col-md-5 col-12 offset-md-4 offset-sm-2">
              <span>Chef's Notebook</span>
            </div>
          </div>

        <div className="row background-home">
          <div className="center-box mt-5 d-flex flex-column justify-content-center">
            { this.state.signUp
            ? <Signup props={this.props}/>
            : <Login props={this.props}/>
            }
            <div className="d-flex">
              <button onClick={this.switchToLogin} className="home-button">Login</button>
              <button onClick={this.switchToSignUp} className="home-button">Signup</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default Home;
