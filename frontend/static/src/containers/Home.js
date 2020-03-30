import React, {Component} from 'react';
import '../App.css';

import Login from '../components/Login.js';
import Signup from '../components/Signup.js';
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
    console.log(this.props);
    return (
      <React.Fragment>

      <div className="row">
      <div id="back">
        <div className="backRight"></div>
        <div className="backLeft"></div>
      </div>

        <div id="slidebox">
          <div className="topLayer">
            <div className="left">
              <div className="content-left">
                <h2>Sign Up</h2>
                <Signup props={this.props}/>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="content-right">
            <h2>Login</h2>
            <Login props={this.props}/>
          </div>
        </div>

      </div>
      </React.Fragment>
    )
  }
}

export default Home;
