import React, {Component} from 'react';
import '../App.css';

import { NavLink } from 'react-router-dom';

import Nav from '../containers/Nav.js';
import moment from 'moment';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class RecipeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
      comment: {},
      isAuthorized: false,
    }

    this.checkAuth = this.checkAuth.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  checkAuth() {

    if (this.state.recipe.owner && localStorage.getItem('currentUser').pk === this.state.recipe.owner.id) {
      this.setState({isAuthorized: true})
    }

  }

  handleChange(e) {
    console.log('fired')
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/comments/`, this.state, {
    headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`}})
    .then(res => console.log(res))
    .catch(err => console.log(err));

    console.log(this.state);
  }

  onDelete(e, id) {

    console.log(e);
    axios.delete(`${BASE_URL}/api/v1/recipes/comments/${e}`)
    .then(response => console.log(response))
    .catch(err => console.log(err));
  }

  handleDelete(e) {
    axios.delete(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}`,)
    .then(response => console.log(response))
    .catch(err => console.log(err));

  }



  componentDidMount() {

    console.log(this.props)
    // get request to pull in single recipe
    axios.get(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/`,
      {
        headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`}
    })
    .then(response => this.setState({recipe: response.data}))
    .catch(err => console.log(err));

  }

  render() {
    this.checkAuth()
    console.log(this.state)
    let comments;
    if(this.state.recipe.comments){
      comments = this.state.recipe.comments.map(comment =>
        (
          <div className="card">
              <div className="card-title">
                <h4>{comment.owner.username}</h4>
                  <p>{comment.date_published}</p>
              </div>
              <div className="card-body">
                <p>{comment.body}</p>
                <div><button className="btn btn-outline-danger" type='submit' onClick={(e) => this.onDelete(comment.id)}>Delete</button>

                </div>

              </div>
            </div>
        ));
    }
    return (
      <React.Fragment>
      <Nav />
      <div className="row no-gutters">
        <div className="col-10 offset-1 mr-auto">
          <div className="recipe-title-div">
            <div className="recipe-title">
              {this.state.recipe.title}
            </div>
            <div className="recipe-description">
              {this.state.recipe.description}
            </div>
          </div>
            {

            }
            <div className="recipe-times-div">
              <div className="recipe-created">
                Created On {moment(this.state.recipe.date_published).format("MMM do YYYY")}
              </div>
              <div className="recipe-updated">
                last updated {moment(this.state.recipe.date_updated).fromNow()}
              </div>
            </div>
          </div>

            <div className="image-create-div col-4">
              <div className="image-preview-div card">
                <img className="image-preview" src="" alt="Whoops! Sorry! No can do."/>
              </div>
            </div>


            <div className="recipe-create-div row no-gutters">
              <div className="recipe-ingredient-div card col-3">
                <div className="form-control col-12 recipe-ingredient-box">
                  {this.state.recipe.ingredients}
                </div>
              </div>
              <div className="recipe-instructions-div card col-9">
                <div className="form-control col-12 recipe-instructions-box">
                  {this.state.recipe.instructions}
                </div>
              </div>
            </div>
      </div>

          {this.state.isAuthorized
            ?
            <React.Fragment>
          <div onClick={this.handleDelete} className="btn btn-outline-danger">Delete Recipe</div>
          <NavLink to={`/update/${this.state.recipe.id}`}><button className="btn btn-outline-primary">Edit Recipe</button></NavLink>
            </React.Fragment>
            :
            null
          }
          <div className="card">
            <div className="card-body">
            <form method="post" type='submit' onSubmit={this.handleSubmit}>
              <input type='text' name="body" defaultValue='' className="form-control" onChange={this.handleChange} />
              <div className="input-group-append">
                <button className="input-group-text">Leave Comment</button>
              </div>
            </form>
            </div>
          </div>

          <div>{comments}</div>

      </React.Fragment>
    )
  }

}
export default RecipeDetail;
