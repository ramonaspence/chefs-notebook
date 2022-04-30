import React, {Component} from 'react';
import '../App.css';

import GoogleSocialAuth from '../authentication/GoogleSocialAuth.js';
import Login from '../authentication/Login.js';
import Signup from '../authentication/Signup.js';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      hidenav: null,
      signUp: false,
    }

    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    if (this.state.signUp) {
      this.setState({signUp: false})
    }
    else {
      this.setState({signUp: true})
    }
    console.log(this.state.signUp)
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
          <div className="center-box mt-0 d-flex flex-column justify-content-around">
            {/*
            NOTES for when I continue this:

            Signup and Login buttons toggle the signup and login components.
            There should be a button to submit, that handles the actual logging in or signing up.

            */}
            {this.state.signUp
            ?
            <Signup props={this.props}/>
            :
            <Login props={this.props}/>
          }
            <div className="login-buttons">
              <button onClick={this.handleToggle} className="home-button">Login</button>
              <button onClick={this.handleToggle} className="home-button">Signup</button>
            </div>
            
            <GoogleSocialAuth />

            

          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default Home;
