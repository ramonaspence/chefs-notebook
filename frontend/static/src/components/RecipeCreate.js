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
        redirect: null
      }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
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
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);

    // formData.append(<user>, recipe.author);

    axios.post(`${BASE_URL}/api/v1/recipes/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`
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
    else
    return (
      <React.Fragment>
      <Nav />
      <div className="row no-gutters">
        <div className="col-10 offset-1">
          <form type='submit' method='post' onSubmit={(e) => this.handleSubmit(e, this.state)}>
            <div className="recipe-title-div">
              <input className="form-control recipe-title" placeholder="title" type='text' name='title' onChange={this.handleChange} defaultValue='' />

              <input className="form-control recipe-description" placeholder="description" type='text' name='description' onChange={this.handleChange} defaultValue='' />
        </div>




            <div className="image-create-div col-4">
              <input className="col-12 image-upload card" type='file' name='image' onChange={this.handleImageChange} />
                <div className="image-preview-div card">

                  {this.state.image
                  ?

                    <img className="image-preview card" src={this.state.preview} alt="preview not available" />

                  :
                    (null)
                  }
                </div>
            </div>


            <div className="recipe-create-div row no-gutters">
            <div className="recipe-ingredient-div card col-3">
            <textarea className="form-control col-12 recipe-ingredient-box" placeholder='Keep your ingredients and measurements here' type='text' name='ingredients' onChange={this.handleChange} defaultValue='' />
            </div>

            <div className="recipe-instructions-div card col-9">
            <textarea className="form-control col-12 recipe-instruction-box" type='text' name='instructions' onChange={this.handleChange} defaultValue='' />
            </div>

            <div className="save-recipe-div">
            <button className="btn btn-outline-success save-recipe-btn">Save Recipe</button>
            </div>
            </div>

          </form>
        </div>
      </div>
      </React.Fragment>


    )
  }

}

export default RecipeCreate;
