import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import '../App.css';
import Nav from '../containers/Nav.js';


const BASE_URL = process.env.REACT_APP_BASE_URL; //environment variable containing the base URL used by this React app.

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class RecipeCreate extends Component {
  constructor() {
    super();

    this.state = {
        recipe: {},
        preview: '',
        redirect: null,
        ingredients: [],
        instructions: []
      }

    this.deleteInstruction = this.deleteInstruction.bind(this);
    this.submitInstructions = this.submitInstructions.bind(this);
    this.handleInstructions = this.handleInstructions.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.submitIngredients = this.submitIngredients.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleInstructions(e) {
    e.preventDefault();
    this.setState({instructStr: e.target.value})
  }

  submitInstructions(e, instructStr) {
    e.preventDefault();
    let instructions = [...this.state.instructions];
    instructions.push(instructStr);
    this.setState({instructions: instructions});
    this.refs.instructionsField.value = '';
  }

  deleteInstruction(e, instruction) {
    e.preventDefault();
    let instructions = [...this.state.instructions];
    let i = instructions.indexOf(instruction);
    instructions.splice(i, 1);
    this.setState({instructions: instructions});
  }

  deleteIngredient(e, ingredient) {
    e.preventDefault();
    let ingredients = [...this.state.ingredients];
    let i = ingredients.indexOf(ingredient);
    ingredients.splice(i, 1);
    this.setState({ingredients: ingredients})
  }

  handleIngredients(e) {
    e.preventDefault();
    this.setState({ingStr: e.target.value})
  }

  submitIngredients(e, ingStr) {
    e.preventDefault();
    let ingredients = [...this.state.ingredients];
    ingredients.push(ingStr);
    this.setState({ingredients: ingredients})
    this.refs.ingredientField.value = '';
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  handleImageChange(e) {
    e.preventDefault();
    let file
    if (e.target.files) {
    file = e.target.files[0];
    this.setState({[e.target.name]: file});
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => this.setState({preview: reader.result});
    }
  }

  handleSubmit(e, recipe) {
    e.preventDefault();
    let formData = new FormData();
    if (recipe.image) {
      formData.append('image', recipe.image);
    }
    formData.append('title', recipe.title);
    formData.append('description', recipe.description);
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('instructions', JSON.stringify(recipe.instructions));
    
    axios.post(`${BASE_URL}/api/v1/recipes/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
        }
    })
    .then(res => this.setState({redirect: true}))
    .catch(err => console.log(err));
    }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/profile/" />)
    }

    if (this.state.instructions) {
      let instructions = this.state.instructions.map(instruction => (
        <div id="instruction-preview" className="form-control instruction-preview col-12">
          <div className="col-12 recipe-instruction-box">{instruction}
          <button type="button" onClick={(e) => this.deleteInstruction(e, instruction)} className="icon"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
          </div>
        </div>
      ))

    if (this.state.ingredients) {
      let ingredients = this.state.ingredients.map(ingredient => (
        <div id="ingredient-preview" className="form-control ingredient-preview col-12">
          <span className="col-12 recipe-ingredient-box">
          {ingredient}
          <button type="button" onClick={(e) => this.deleteIngredient(e, ingredient)} className="icon"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
          </span>
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
                  <form className="instruction-form col-lg-9 col-12">
                    <div className="recipe-instructions-div col-12">
                      {instructions}
                      <input className="form-control col-12 recipe-instructions-box" ref="instructionsField" placeholder="Step-by-Step Instructions" type='text' name='instructions' onChange={this.handleInstructions} defaultValue='' />
                      <button type="submit" onClick={(e) => this.submitInstructions(e, this.state.instructStr)}>Add</button>
                    </div>
                  </form>


                  </div>
                </div>
              </form>
            </div>
          </div>
      </React.Fragment>


    )
  }}}

}

export default RecipeCreate;
