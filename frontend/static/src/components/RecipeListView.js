import React, {Component} from 'react';
import '../App.css';

import Nav from '../containers/Nav.js';

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
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleSearchInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
    console.log(this.state);
  }

  handleSearch(e) {
    e.preventDefault();
    console.log('fires')
    axios.get(`${BASE_URL}/api/v1/recipes/?title__icontains=${this.state.title ? this.state.title : 'title'}&${this.state.description ? this.state.description : 'description__icontains'}=&${this.state.author ? this.state.author : 'author__icontains'}=`)
    .then(res => this.setState({recipes: res.data}))
    .catch(err => console.log(err));
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/v1/recipes/`,
      {
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`
    }})

    .then(response => this.setState({recipes: response.data}))
    .catch(err => console.log(err));

  }

  render() {
      let recipes = this.state.recipes.map(recipe => (

        <div className="row no-gutters">
          <div className="col-8 ml-auto card d-flex">
            <div className="title card-body">
              <h1>{recipe.title}</h1>
              <h2>{recipe.author.username}</h2>
              <img className="recipe-list-img" src={recipe.image} alt="Whoops! Sorry! No can do."/>



            <div className='recipe-list-body'>
            <Link to={`/recipes/${recipe.id}`} className="btn btn-outline-success">View</Link>

            <p>{recipe.description}</p>
            <p>{recipe.date_published}</p>
            </div>
          </div>
          </div>
        </div>
      ))
        return (
        <React.Fragment>
        { this.props.hidenav
          ?
          null
          :
          <Nav />
        }
        <form onSubmit={this.handleSearch} className="search form-inline ml-5">
          <input className="form-control mr-lg-2" type="search" name="title" placeholder="Search by title" aria-label="Search" onChange={this.handleSearchInput} />
          <input className="form-control mr-lg-2" type="search" name="description" placeholder="Search by description" aria-label="Search" onChange={this.handleSearchInput} />
          <input className="form-control mr-lg-2" type="search" name="author" placeholder="Search by author" aria-label="Search" onChange={this.handleSearchInput} />
          <button className="btn btn-outline-light my-2 my-sm-0" type='submit'>Search</button>
        </form>
        <ul>
          <li>
            {recipes}
          </li>
        </ul>
      </React.Fragment>
    )

}
}

export default RecipeList;
