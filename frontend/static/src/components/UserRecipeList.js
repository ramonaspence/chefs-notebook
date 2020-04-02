import React, {Component} from 'react';
import '../App.css';

import Nav from '../containers/Nav.js';
import moment from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class UserRecipeList extends Component {
  constructor(props) {
    super(props);

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
    axios.get(`${BASE_URL}/api/v1/recipes/?${this.state.title ? `title__icontains=${this.state.title}&` : ''}${this.state.description ? `description__icontains=${this.state.description}&` : ''}${this.state.tags ? `tags__icontains=${this.state.tags}` : ''}`)
    .then(res => this.setState({recipes: res.data}))
    .catch(err => console.log(err));
  }



  componentDidMount() {
    console.log(this.props);
    axios.get(`${BASE_URL}/api/v1/recipes/user/${this.props.profile}`,
      {
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`
    }})

    .then(response => this.setState({recipes: response.data}))
    .catch(err => console.log(err));


  }

  render() {
    console.log(this.props);
   let recipes = this.state.recipes.map(recipe =>  (

        <div className="row">
          <div className="profile-recipe-list col-md-12 col-10 card">
            <div className="title card-body col-12">
              <h1>{recipe.title}</h1>
              <Link to={`/recipes/${recipe.id}`}><button className="view-recipe-btn">View</button></Link>
              <h5>{recipe.owner.username}</h5>
              <img className="recipe-list-img" src={recipe.image} alt="Whoops! Sorry! No can do."/>
            </div>


              <div className='recipe-list-body'>
                <p>{recipe.description}</p>
              <div className="recipe-datetimes">
                <p>created on {moment(recipe.date_published).format("MMM Do YYYY")}</p>
                <p>last updated {moment(recipe.date_updated).fromNow()}</p>
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
        { this.props.hidesearch
        ?
        <form onSubmit={this.handleSearch} className="search form-inline ml-5">
          <input className="form-control mr-lg-2" type="search" name="title" placeholder="Search by title" aria-label="Search" onChange={this.handleSearchInput} />
          <input className="form-control mr-lg-2" type="search" name="description" placeholder="Search by description" aria-label="Search" onChange={this.handleSearchInput} />
          <input className="form-control mr-lg-2" type="search" name="tags" placeholder="Search by tags" aria-label="Search" onChange={this.handleSearchInput} />
          <button className="btn btn-outline-light my-2 my-sm-0" type='submit'>Search</button>
        </form>
        :
        null
        }
        <ul>
          <li>
            {recipes}
          </li>
        </ul>
      </React.Fragment>
    )

}
}

export default UserRecipeList;
