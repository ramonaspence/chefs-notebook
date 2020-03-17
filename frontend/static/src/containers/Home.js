import React, {Component} from 'react';
import '../App.css';
import Nav from '../containers/Nav.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class Home extends Component {


  render() {
    return (
      <React.Fragment>
      <Nav />
      <div className="row no-gutters">
        <h1>This is the Home Page</h1>
      </div>
      </React.Fragment>
    )
  }
}

export default Home;
