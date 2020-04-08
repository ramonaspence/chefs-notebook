import React, {Component} from 'react';
import '../App.css';


import { NavLink, Redirect } from 'react-router-dom';

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
    console.log('fires')
    if (this.state.recipe.owner && JSON.parse(localStorage.getItem('currentUser')).userid === this.state.recipe.owner.id) {
      this.setState({isAuthorized: true})
    }
  }

  handleChange(e) {

    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/comments/`, this.state, {
    headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}})
    .then(res => console.log(res))
    .catch(err => console.log(err));


  }

  onDelete(e, id) {

    console.log(e);
    axios.delete(`${BASE_URL}/api/v1/recipes/comments/${e}`, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(response => this.setState({deleted: true}))

    .catch(err => console.log(err));
  }

  handleDelete(e) {
    axios.delete(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}`,
      {
        headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(response => console.log(response))
    .catch(err => console.log(err));

  }



  componentDidMount() {


    // get request to pull in single recipe
    axios.get(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/`,
      {
        headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(response => this.setState({recipe: response.data}))
    .then(response => this.checkAuth())
    .then(res => console.log(this.state))
    .catch(err => console.log(err));



  }

  render() {


    let comments;
    if(this.state.recipe.comments){
      comments = this.state.recipe.comments.map(comment =>
        (
          <div className="card comment">
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
    if (this.state.deleted) {
      return (<Redirect to="/profile/" />)
    }
    else {

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
                    {this.state.recipe.ingredients}
                  </div>
                </div>
                <div className="recipe-instructions-div col-lg-9 col-12">
                  <div className="form-control col-12 recipe-instructions-box">
                    {this.state.recipe.instructions}
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
                  <input type='text' name="body" defaultValue='' className="form-control" onChange={this.handleChange} />
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
}
export default RecipeDetail;
