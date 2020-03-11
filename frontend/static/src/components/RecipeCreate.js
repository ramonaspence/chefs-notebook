import React, {Component} from 'react';
import '../App.css';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class RecipeCreate extends Component {
  constructor() {
    super();

    this.state = {
        recipe: {

        }
      }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})

  }

  handleSubmit(e, recipe) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('description', recipe.description);
    formData.append('image', recipe.image);
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);

    axios.post(`${BASE_URL}/api/v1/recipes/`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    .then(res => console.log(res, res.data))
    .catch(err => console.log(err));

  }

  render() {
    return (
      <div className="row no-gutters">
        <div className="col-10 offset-1">
          <form type='submit' onSubmit={(e) => this.handleSubmit(e, this.state)}>
            <label htmlFor="title">Recipe Title:</label>
            <input type='text' name='title' onChange={this.handleChange} defaultValue='' />

            <label htmlFor="description">Description:</label>
            <input type='text' name='description' onChange={this.handleChange} defaultValue='' />

            <label htmlFor="image">Add an Image for this Recipe</label>
            <input type='file' accept='image/jpg, image/jpeg, image/png' alt="" name='image' onChange={this.handleChange} />

            <label htmlFor="ingredients">Keep your list of ingredients here</label>
            <input type='text' name='ingredients' onChange={this.handleChange} defaultValue='' />

            <label htmlFor="instructions">Tell us how to make it!</label>
            <input type='text' name='instructions' onChange={this.handleChange} defaultValue='' />

            <button>Save Recipe</button>

          </form>
        </div>
      </div>


    )
  }

}

export default RecipeCreate;
