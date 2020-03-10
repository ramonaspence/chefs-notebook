import React, {Component} from 'react';
import '../App.css';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class RecipeList extends Component {
  constructor() {
    super();


  }

  render() {
    return (
      <div className="row no-gutters">
        <ul>
          <li>
            
          </li>
        </ul>
      </div>
    )
  }
}
