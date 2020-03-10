import React, {Component} from 'react';
import '../App.css';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class RecipeList extends Component {
  constructor() {
    super();

      this.state = {
        recipes: [],
      }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/v1/recipes/`)

    .then(response => this.setState({recipes: response.data}))
    .catch(err => console.log(err));

  }

  render() {
      let recipes = this.state.recipes.map(recipe => (

        <div className="row no-gutters">
          <ul className="col-8 offset-2 mr-auto">
            <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              <p>{recipe.date_published}</p>
          </ul>

        <div className="col-4 ml-auto">
        <img src={recipe.image} />
        </div>
        <ul>
          <li>
            <p>{recipe.instructions}</p>
          </li>
        </ul>
          <p>{recipe.date_updated}</p>
        </div>
      ))

        return (

        <ul>
          <li>
            {recipes}
          </li>
        </ul>

    )

}
}

export default RecipeList;
