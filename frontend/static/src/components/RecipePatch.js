import React, {Component} from 'react';
import '../App.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class RecipePatch extends Component {
  constructor() {
    super();

    this.state = {
      recipes: {},
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
    console.log(this.state);
  }

  handleSubmit(e, recipe) {
    e.preventDefault();

    axios.put(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/`, recipe,)
    .then(response => console.log(response))
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log(this.props.match);

    // get request to pull in single recipe
    axios.get(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/`)
    .then(response => this.setState(response.data))
    .catch(err => console.log(err));

  }

  render() {
    return(
      <div className="row no-gutters">
        <div className="col-10 offset-1">
          <form type='submit' method='patch' onSubmit={(e) => this.handleSubmit(e, this.state)}>
            <label htmlFor="title">Recipe Title:</label>
            <input type='text' name='title' onChange={this.handleChange} defaultValue={this.state.title} />

            <label htmlFor="description">Description:</label>
            <input type='text' name='description' onChange={this.handleChange} defaultValue={this.state.description} />

            <label htmlFor="image">Add an Image for this Recipe</label>
            <input type='file' name='image' onChange={this.handleImageChange} />

            {this.state.image
              ?
            <img src={this.state.preview} alt="preview not available" />
             :
             (null)
            }

            <label htmlFor="ingredients">Keep your list of ingredients here</label>
            <input type='text' name='ingredients' onChange={this.handleChange} defaultValue={this.state.ingredients} />

            <label htmlFor="instructions">Tell us how to make it!</label>
            <input type='text' name='instructions' onChange={this.handleChange} defaultValue={this.state.instructions} />

            <label htmlFor="tags">Add tags to your recipe so people can find it easier!</label>
            <input type='text' name='tags' onChange={this.handleChange} defaultValue={this.state.tags} />

            <NavLink to="/recipes/">Save Recipe</NavLink>

          </form>
        </div>
      </div>
    )
  }
}
export default RecipePatch;
