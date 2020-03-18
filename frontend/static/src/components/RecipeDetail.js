import React, {Component} from 'react';
import '../App.css';

import { NavLink, Redirect } from 'react-router-dom';

import Nav from '../containers/Nav.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class RecipeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
      comment: {
        recipe: {}
      },
      edit: false
    }
    //
    // this.handleEdit = this.handleEdit.bind(this);
    // this.toggleEdit = this.toggleEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // handleEdit(e) {
  //   e.preventDefault();
  //   axios.patch(`${BASE_URL}/api/v1/recipes/comments/${this.state.comment.id}/`)
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log(err));
  // }
  //
  // toggleEdit(e) {
  //   e.preventDefault();
  //   this.setState({edit: true});
  // }

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
    //
    // axios.get(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/comments/`)
    // .then(response => this.setState({commentlist: response.data}))
    // .catch(err => console.log(err));
    //
    // console.log(this.state);

  }

  render() {
    let comments;
    if(this.state.recipe.comments){
      comments = this.state.recipe.comments.map(comment =>
        (
          <div className="card">
              <div className="card-title">
                <h4>{comment.author.username}</h4>
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
        <div className="col-8 offset-2 mr-auto card">
          <div className="card-body">
            <div className="card-title">
              <h2>{this.state.recipe.title}</h2>

            </div>

                <div onClick={this.handleDelete} className="btn btn-outline-danger">Delete Recipe</div>


              <NavLink to={`/update/${this.state.recipe.id}`}><button className="btn btn-outline-primary">Edit Recipe</button></NavLink>

              <p>{this.state.recipe.description}</p>

              <p>{this.state.recipe.ingredients}</p>

              <p>{this.state.recipe.instructions}</p>

              <p>{this.state.recipe.date_published}</p>

          </div>
          <div className="col-4 ml-auto">
            <img src="" alt="Whoops! Sorry! No can do."/>
          </div>

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
        </div>


      </div>
      </React.Fragment>
    )
  }

}
export default RecipeDetail;
