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
    }
  }


  render() {
    return (
      <React.Fragment>

      <div className="row">
        <div id="nav-bar" className='navbar navbar-expand-lg navbar-dark navbar-background col-12'>
          <div className="nav-title col-md-5 col-12 offset-md-4 offset-sm-2">
            <span>Chef's Notebook</span>
          </div>
        </div>
      </div>

      <div className="row background-home">
        <div className="center-box">
          <button className="home-button">Log In</button>
          <button className="home-button">Sign Up</button>
        <Login props={this.props}/>
        <Signup props={this.props}/>
        <GoogleSocialAuth />
        </div>
{/* 
        <div className="left">
          <div className="col-sm-6 col-12 content-left">
            <h2>Signup</h2>
            <Signup props={this.props}/>
</div>  */}

          {/* <div className="right">
            <div className="col-sm-6 col-12 content-right">
              <h2>Login</h2>
              <Login props={this.props}/>
             
            </div> 

          </div>*/}
        </div>
      </React.Fragment>
    )
  }
}
export default Home;
