import React, {Component} from 'react';
import '../App.css';

import Nav from '../containers/Nav.js';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class ExploreRecipeList extends Component {
  constructor(props) {
    super(props);

      this.state = {
        recipes: [],
        tagpreviews: [],
        loading: true
      }
    this.handleBadRequest = this.handleBadRequest.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleKeyEvent(e) {

    // e.preventDefault();
    if(e.key === ' ' && e.key !== 'Tab') {
      this.setState({tagpreviews: [e.target.value]});
    }
    else {
      return
    }
  }

  handleSearchInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  handleBadRequest() {
    this.setState({badRequest: true})
  }


  handleSearch(e) {
    e.preventDefault();
    
    const title = this.state.title ? this.state.title : '';
    const description = this.state.description ? this.state.description : '';

    const filterAPICall = (tagStr) => {
      axios.get(`${BASE_URL}/api/v1/recipes/?title__icontains=${title}&description__icontains=${description}${tagStr}/`, {
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
      }
      })
      .then((res) => {
        if (res.data.length !== 0) {
          this.setState({ recipes: res.data });
        }
        else if (res.status === 400) {
          this.setState({ badRequest: true })
        }})
        .catch((err) => console.log(err));
    };

    let tagStr = '';
    if (this.state.tags) {
      if (this.state.tags.includes(' ')) {
        // handles reformatting of multiple tags
        let tags = this.state.tags.split(' ');
        tags.forEach(tag => tagStr += `&tags=${tag}`) 
        
        filterAPICall(tagStr)
      }
      else {
        // handles formatting of single tag
        let tagStr = `&tags=${this.state.tags}`;
        filterAPICall(tagStr)
      }
    }
    else {
      filterAPICall('')
    }
  }


  componentDidMount() {
    axios.get(`${BASE_URL}/api/v1/recipes/`, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(res => this.setState({recipes: res.data, loading: false}))
    .catch(err => console.log(err));

  }

  render() {
    if (this.state.badRequest) {
      return (
        <Redirect to="/oops/" />
      )
    }
    let tagpreviews = this.state.tagpreviews.map(tag => (

          <span key={tag.id} className="tags-preview-span">{tag}</span>

      ))

    
    const recipes = this.state.recipes.map(recipe =>  (

        <div key={recipe.id} className="row no-gutters">
          <div className="col-lg-8 col-12 offset-lg-1 mr-lg-auto mr-auto card d-flex">
            <div className="title card-body">
              <h1>{recipe.title}</h1>

              <Link to={`/users/profile/${recipe.owner.profile.id}`}><h5>{recipe.owner.username}</h5></Link>

              <img className="recipe-list-img" src={recipe.image} alt="Whoops! Sorry! No can do."/>



            <div className='recipe-list-body'>
            <Link to={`/recipes/${recipe.id}`} className="btn btn-outline-success view-recipe-btn">View</Link>

            <p>{recipe.description}</p>
            <p>created on {moment(recipe.date_published).format("MMM Do YYYY")}</p>
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
        <div className="row no-gutters explore-recipe-form">
        <form role="search" onSubmit={this.handleSearch} className="search form-inline col-12">
          <input className="form-control mr-lg-2" type="search" name="title" placeholder="Search by title" aria-label="Search" onChange={this.handleSearchInput} />
          <input className="form-control mr-lg-2" type="search" name="description" placeholder="Search by description" aria-label="Search" onChange={this.handleSearchInput} />


          <input className="form-control mr-lg-2" type="search" name="tags" placeholder="Search by tags" aria-label="Search" onKeyUp={this.handleKeyEvent} onChange={this.handleSearchInput} />

          {this.state.tags
            ?
            <div className="tags-preview col-4 offset-lg-4">

            {tagpreviews}

            </div>
            :
            <div className="tags-preview col-2 offset-lg-4">
            </div>
          }

          <button className="btn search-btn btn-outline-dark my-2 my-sm-0" type='submit'>Search</button>
        </form>

        </div>
        {
          this.state.loading
          ?
          <img className="loader" src={require('../images/loader.gif')} alt="loading..." />
          :
        <ul>
          <li>
            {recipes}
          </li>
        </ul>
        } 
      </React.Fragment>
    )

}
}

export default ExploreRecipeList;
