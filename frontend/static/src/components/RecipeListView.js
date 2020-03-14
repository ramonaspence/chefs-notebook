import React, {Component} from 'react';
import '../App.css';


import { Link } from 'react-router-dom';
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
    console.log(this.props);
      let recipes = this.state.recipes.map(recipe => (

        <div className="row no-gutters">
          <div className="col-8 ml-auto card d-flex">
            <div className="title card-body">
              <div className="card-title">
              <h1>{recipe.title}</h1>
              <h2>{recipe.author.username}</h2>
              </div>

              <Link to={`/recipes/${recipe.id}`} className="btn btn-outline-success">View</Link>
            </div>
            <div className="d-flex align-self-end">
              <img src={recipe.image} alt="Whoops! Sorry! No can do."/>

            </div>
            <p>{recipe.description}</p>
            <p>{recipe.date_published}</p>
          </div>

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
