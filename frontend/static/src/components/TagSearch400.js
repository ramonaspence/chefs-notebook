import React, {Component} from 'react';
import '../App.css';

import {NavLink} from 'react-router-dom';

import Nav from '../containers/Nav.js';

class BadRequest extends Component {

  render() {
    return (
      <React.Fragment>
      <Nav />
      <div className="row">
        <div className="card col-md-6 offset-md-3 col-12 mr-auto">
          <div className="card-body col-12 bad-request-box">
            <h2 className="bad-request-header">Oh no!</h2>
            <span className="bad-request-msg">We couldn't find any recipes with those tags</span>
            <NavLink className="bad-request-link" to="/recipes/">Let's try that again</NavLink>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}
export default BadRequest;
