import React, {Component} from 'react';
import '../App.css';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class Home extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="row no-gutters">
        <h1>This is the Home Page</h1>
      </div>
    )
  }
}

export default Home;
