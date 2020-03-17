import React, {Component} from 'react';
import '../App.css';

import {Redirect} from 'react-router-dom';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class RecipeCreate extends Component {
  constructor() {
    super();

    this.state = {
        recipe: {},
        preview: '',
        redirect: null
      }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})


  }

  handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    this.setState({[e.target.name]: file});


    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.setState({preview: reader.result});
  }

  handleSubmit(e, recipe) {
    e.preventDefault();
    let formData = new FormData();

    formData.append('title', recipe.title);
    formData.append('description', recipe.description);
    formData.append('image', recipe.image);
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);
    formData.append('tags', recipe.tags);
    // formData.append(<user>, recipe.author);

    axios.post(`${BASE_URL}/api/v1/recipes/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    .then(res => console.log(res))
    .catch(err => console.log(err));
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/recipes/:id" />)
    }
    else
    return (
      <div className="row no-gutters">
        <div className="col-10 offset-1">
          <form type='submit' method='post' onSubmit={(e) => this.handleSubmit(e, this.state)}>
            <label htmlFor="title">Recipe Title:</label>
            <input type='text' name='title' onChange={this.handleChange} defaultValue='' />

            <label htmlFor="description">Description:</label>
            <input type='text' name='description' onChange={this.handleChange} defaultValue='' />

            <label htmlFor="image">Add an Image for this Recipe</label>
            <input type='file' name='image' onChange={this.handleImageChange} />

            {this.state.image
              ?
            <img src={this.state.preview} alt="preview not available" />
             :
             (null)
            }

            <label htmlFor="ingredients">Keep your list of ingredients here</label>
            <input type='text' name='ingredients' onChange={this.handleChange} defaultValue='' />

            <label htmlFor="instructions">Tell us how to make it!</label>
            <input type='text' name='instructions' onChange={this.handleChange} defaultValue='' />

            <label htmlFor="tags">Add tags to your recipe so people can find it easier!</label>
            <input type='text' name='tags' onChange={this.handleChange} defaultValue='' />

            <button>Save Recipe</button>

          </form>
        </div>
      </div>


    )
  }

}

export default RecipeCreate;
