import React, {Component} from 'react';
import '../App.css';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class RecipeDetail extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      author: '',

    }

  }

  componentDidMount() {
    console.log(this.props.match);
    // get request to pull in single recipe
    axios.get(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/`)
    .then(response => console.log(response))
    .catch(err => console.log(err));

  }

  render() {
    return (
      <div className="row no-gutters">
        <div className="col-8 offset-2 mr-auto card">
          <div className="card-body">
            <h2 className="card-title">{this.state.title}</h2>
          </div>
          <div>
            <p>{this.state.author}</p>
            <p></p>
          </div>
        </div>
        <div className="card-body">
        <ul>
          <li>
            <p></p>
          </li>
            <li>
              <p></p>
            </li>
          </ul>
        </div>

      <div className="col-4 ml-auto">
      <img src="" alt="Whoops! Sorry! No can do."/>
      </div>

      </div>
    )
  }

}
export default RecipeDetail;
