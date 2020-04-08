import React, {Component} from 'react';
import '../App.css';


import Nav from '../containers/Nav.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class RecipeUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: {},
      preview: '',
      ingredients: [],
      instructions: [],
    }

    this.deleteInstruction = this.deleteInstruction.bind(this);
    this.submitInstructions = this.submitInstructions.bind(this);
    this.handleInstructions = this.handleInstructions.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.submitIngredients = this.submitIngredients.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handleVersion = this.handleVersion.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  }

  handleImageChange(e) {
    e.preventDefault();

    let file = e.target.files[0];
    this.setState({[e.target.name]: file});

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.setState({preview: reader.result});

  }

    handleSubmit(e) {
      e.preventDefault();

      let formData = new FormData();
      formData.append('title', this.state.title);
      formData.append('description', this.state.description);
      formData.append('ingredients', this.state.ingredients);
      formData.append('instructions', this.state.instructions);
      formData.append('tags', this.state.tags);


      if (this.state.image === File) {
        formData.append('image', this.state.image);
      }




    axios.patch(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}

    })
    .then(response => console.log(response))
    .catch(err => console.log(err));
  }

  handleVersion(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('ingredients', this.state.ingredients);
    formData.append('instructions', this.state.instructions);
    formData.append('tags', this.state.tags);


    if (this.state.image === File) {
      formData.append('image', this.state.image);
    } else

    axios.post(`${BASE_URL}`)
  }

  componentDidMount() {

    // get request to pull in single recipe
    axios.get(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}`, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(response => this.setState({ingredients: JSON.parse(response.data.ingredients), instructions: JSON.parse(response.data.instructions), recipes: response.data}))
    .catch(err => console.log(err));
  }

  render() {
    let ingredients
    if (this.state.ingredients) {
      ingredients = this.state.ingredients.map(ingredient => (
        <div id="ingredient-preview" className="form-control ingredient-preview col-12">

          {ingredient}
          <button type="button" onClick={(e) => this.deleteIngredient(e, ingredient)} className="icon"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
        </div>
      ))
    }
    let instructions;
    if (this.state.instructions) {
      instructions = this.state.instructions.map(instruction => (
        <div id="instruction-preview" className="form-control instruction-preview col-12">
          <div className="col-12 recipe-instruction-box">{instruction}
          <button type="button" onClick={(e) => this.deleteInstruction(e, instruction)} className="icon"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
          </div>
        </div>
      ))
    }
    return(
      <React.Fragment>
      <Nav />
      <div className="row">
        <div className="col-12 mr-auto">
          <form type='submit' method='post' onSubmit={(e) => this.handleSubmit(e, this.state)}>
            <div className="recipe-title-div col-12">
              <input className="form-control recipe-title col-md-10 col-12"  type='text' name='title' onChange={this.handleChange} defaultValue={this.state.recipes.title} />

              <input className="form-control recipe-description col-12" type='text' name='description' onChange={this.handleChange} defaultValue={this.state.recipes.description} />
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
                    <img className="image-preview col-12 " src={this.state.recipes.image} alt="preview not available" />
                  }
                </div>
            </div>

            <div className="row">
              <div className="recipe-create-div col-12 ml-auto">

                <div className="recipe-ingredient-div col-lg-3 col-12">
                  {ingredients}
                  <input className="col-12 recipe-ingredient-box" />
                  <button type="submit" onClick={(e) => this.submitIngredients(e, this.state.ingStr)}>Add</button>
                </div>

                <div className="recipe-instructions-div col-lg-9 col-12">
                  {instructions}
                  <input className="form-control col-12 recipe-instructions-box" ref="instructionsField" placeholder="Step-by-Step Instructions" type='text' name='instructions' onChange={this.handleInstructions} defaultValue='' />
                  <button type="submit" onClick={(e) => this.submitInstructions(e, this.state.instructStr)}>Add</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      </React.Fragment>
    )
  }
}
export default RecipeUpdate;
