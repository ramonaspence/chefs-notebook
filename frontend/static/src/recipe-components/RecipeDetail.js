import React, {Component} from 'react';
import '../App.css';


import { NavLink, Redirect } from 'react-router-dom';

import Nav from '../containers/Nav.js';
import moment from 'moment';
import axios from 'axios';
import GetAPICall, { PostAPICall } from '../utils/makeAPICall';

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
    this.commentSubmit = this.commentSubmit.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  checkAuth() {
    if (this.state.recipe.owner && JSON.parse(localStorage.getItem('currentUser')).userid === this.state.recipe.owner.id) {
      this.setState({isAuthorized: true})
    }
  }

  handleChange(e) {

    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  commentSubmit(data) {
    let recipe = {...this.state.recipe};
    // let comments = [...this.state.recipe.comments]
    console.log(data);
    recipe.comments.push(data);
    this.setState({comments: recipe.comments})
    this.refs.commentField.value = '';
  }

  handleSubmit(e) {
    e.preventDefault();
    PostAPICall(`/recipes/${this.props.match.params.id}/comments/`, this.state)
    .then(res => this.commentSubmit(res.data))
    .catch(err => console.log(err));
  }

  commentDelete(id) {
    console.log(id)
    let recipe = {...this.state.recipe}
    // let comments = [...this.state.recipe.comments];
    let i = recipe.comments.findIndex(comment => comment.id === id);
    recipe.comments.splice(i, 1);
    this.setState({comments: recipe.comments})
  }

  onDelete(e, id) {

    axios.delete(`${BASE_URL}/api/v1/recipes/comments/${e}`, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(response => console.log('res',response))
    .catch(err => console.log(err));

    this.commentDelete(e);
  }

  handleDelete(e) {
    axios.delete(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}`,
      {
        headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(response => this.setState({redirect: true}))
    .catch(err => console.log(err));

  }



  componentDidMount() {
    // get request to pull in single recipe
    GetAPICall(`/recipes/${this.props.match.params.id}/`)
    .then(response =>  this.setState({ingredients: JSON.parse(response.data.ingredients), instructions: JSON.parse(response.data.instructions), recipe: response.data}))
    .then(response => this.checkAuth())
    .catch(err => console.log(err));



  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/profile/" />)
    }

    let comments;
    if (this.state.recipe.comments) {
      comments = this.state.recipe.comments.map(comment =>
        (
          <div key={comment.id} className="card comment">
              <div className="card-title">
                <div className="comment-owner">{comment.owner.username}</div>

                  { comment.owner.id && comment.owner.id === JSON.parse(localStorage.getItem('currentUser')).userid
                  ?
                  <button className="btn btn-sm btn-outline-primary delete-comment" type='submit' onClick={(e) => this.onDelete(comment.id)}>Delete</button>
                  :
                  null
                  }

              </div>
              <div className="card comment-body-div">
                <div className="comment-body">
                {comment.body}
                </div>

              </div>

              <div className="comment-date-published">
              posted: {moment(comment.date_published).fromNow()}
              </div>
              </div>

        ));
    }


    let instructions;
    if (this.state.instructions) {
      instructions = this.state.instructions.map(instruction => (
        <div key={instruction.id} id="instruction-preview" className="form-control instruction-preview col-12">
          <span className="col-12 recipe-instructions-box">{instruction}</span>
        </div>
      ))
    }
    let ingredients;
    if (this.state.ingredients) {
      ingredients = this.state.ingredients.map(ingredient => (
      <div key={ingredient.id} id="ingredient-preview" className="form-control ingredient-preview col-12">
        <span className="col-12 recipe-ingredient-box">{ingredient}</span>
      </div>
    ));
  }
    return (
      <React.Fragment>
        <Nav />
          <div className="row">
            <div className="col-12 mr-auto">
              <div className="form-div">
                <div className="recipe-title-div col-12">
                  <div className="recipe-detail-title col-md-10 col-12">
                    {this.state.recipe.title}
                  </div>
                  <div className="recipe-detail-description col-12">
                    {this.state.recipe.description}

                  </div>
                </div>

                <div className="recipe-times-div col-12 mr-auto">
                  <div className="recipe-created">
                    Created On {moment(this.state.recipe.date_published).format("MMM do YYYY")}
                  </div>
                  <div className="recipe-updated">
                    last updated {moment(this.state.recipe.date_updated).fromNow()}
                  </div>
                </div>
            </div>

            {this.state.isAuthorized
              ?
              <React.Fragment>
            <div className="recipe-save-div col-12 mr-auto">
              <button onClick={this.handleDelete}>Delete Recipe</button>

              <NavLink to={`/update/${this.state.recipe.id}`}><button>Edit Recipe</button></NavLink>
              </div>
              </React.Fragment>
              :
              <div className="recipe-save-div">
              </div>
            }

            <div className="image-detail-div col-lg-4 col-12 mr-auto">
              <div className="image-preview-div col-12 form-control card">
                <img className="image-preview col-12" src={this.state.recipe.image} alt="Whoops! Sorry! No can do."/>
              </div>
            </div>


            <div className="row">
              <div className="recipe-detail-div col-12 ml-auto">
                <div className="recipe-ingredient-div col-lg-3 col-12">
                  <div className="form-control col-12 recipe-ingredient-box">
                  {ingredients}
                  </div>
                </div>
                <div className="recipe-instructions-div col-lg-9 col-12">
                  <div className="form-control col-12 recipe-instructions-box">
                    {instructions}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
            <div className="card col-lg-6 offset-lg-2 col-12">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#comments">
                <i className="fa fa-bars"><span className="comments-toggler-btn">Comments</span></i>
              </button>
              <div className="collapse navbar-collapse" id="comments">
                <div className="card-body">
                <form method="post" type='submit' onSubmit={this.handleSubmit}>
                  <input type='text' name="body" ref="commentField" defaultValue='' className="form-control" onChange={this.handleChange} />
                  <div className="input-group-append">
                    <button className="input-group-text">Leave Comment</button>
                  </div>
                </form>
                </div>

                <div className="card col-lg-8 offset-lg-1 col-12">{comments}</div>
              </div>
            </div>
      </React.Fragment>
    )

}
}
export default RecipeDetail;
