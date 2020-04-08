import React, {Component} from 'react';
import '../App.css';

import {Redirect} from 'react-router-dom';
import Nav from '../containers/Nav.js';
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
        redirect: null,
        ingredients: [],
      }

    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.submitIngredients = this.submitIngredients.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  deleteIngredient(e, ingredient) {
    e.preventDefault();
    let ingredients = [...this.state.ingredients];
    let i = ingredients.indexOf(ingredient);
    console.log(i);
    ingredients.splice(i, 1);
    this.setState({ingredients: ingredients})
    console.log(this.state);
  }

  handleIngredients(e) {
    e.preventDefault();

    this.setState({ingStr: e.target.value})
    console.log(this.state);
  }

  submitIngredients(e, ingStr) {
    e.preventDefault();
    let ingredients = [...this.state.ingredients];
    ingredients.push(ingStr);
    this.setState({ingredients: ingredients})
    console.log('button', this.state);
    this.refs.ingredientField.value = '';


  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
    console.log(this.state);

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
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('instructions', recipe.instructions);

    // formData.append(<user>, recipe.author);

    axios.post(`${BASE_URL}/api/v1/recipes/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
        }

    })

    .then(res => console.log(res))
    .catch(err => console.log(err));
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/profile/" />)
    }
    if (this.state.ingredients) {
      let ingredients = this.state.ingredients.map(ingredient => (
        <div className="form-control ingredient-preview col-12">
          <span className="col-12 recipe-ingredient-box">{ingredient}</span>
          <button type="button" onClick={(e) => this.deleteIngredient(e, ingredient)} className="icon"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
        </div>
      ))

    return (
      <React.Fragment>
        <Nav />
          <div className="row">
            <div className="col-12 mr-auto">
              <form type='submit' method='post' onSubmit={(e) => this.handleSubmit(e, this.state)}>
                <div className="recipe-title-div col-12">
                  <input className="form-control recipe-title col-md-10 col-12" placeholder="title" type='text' name='title' onChange={this.handleChange} defaultValue='' />

                  <input className="form-control recipe-description col-12" placeholder="description" type='text' name='description' onChange={this.handleChange} defaultValue='' />
                </div>
                <div className="save-recipe-div col-12 mr-auto">
                  <button className="save-recipe-btn">Save Recipe</button>
                </div>

                <div className="image-create-div col-lg-4 col-12 mr-auto">
                  <input className="col-12 image-upload card" type='file' name='image' onChange={this.handleImageChange} />
                    <div className="image-preview-div col-12 card">
                      {this.state.image
                      ?
                        <img className="image-preview col-12" src={this.state.preview} alt="preview not available" />
                      :
                        (null)
                      }
                    </div>
                </div>

                <div className="row">
                  <div className="recipe-create-div col-12 ml-auto">
                  <form className="ingredient-form col-lg-3 col-12">
                    <div className="recipe-ingredient-div col-12">
                      {ingredients}
                      <input className="form-control col-12 recipe-ingredient-box" ref="ingredientField" onChange={this.handleIngredients} placeholder='Keep your ingredients and measurements here' type='text' name='ingredients'  defaultValue='' />
                      <button type="submit" onClick={(e) => this.submitIngredients(e, this.state.ingStr)}>Add</button>
                    </div>
                  </form>

                    <div className="recipe-instructions-div col-lg-9 col-12">
                      <textarea className="form-control col-12 recipe-instructions-box" placeholder="Step-by-Step Instructions" type='text' name='instructions' onChange={this.handleChange} defaultValue='' />
                    </div>


                  </div>
                </div>
              </form>
            </div>
          </div>
      </React.Fragment>


    )
  }}

}

export default RecipeCreate;
