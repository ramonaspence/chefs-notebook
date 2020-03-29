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
    }

    this.handleVersion = this.handleVersion.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`}

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
    axios.get(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}`)
    .then(response => this.setState({recipes: response.data}))
    .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
    return(
      <React.Fragment>
      <Nav />
      <div className="row no-gutters">
        <div className="col-10 offset-1">
          <form type='submit' method='post' onSubmit={(e) => this.handleSubmit(e, this.state)}>
            <div className="recipe-title-div">
              <input className="form-control recipe-title"  type='text' name='title' onChange={this.handleChange} defaultValue={this.state.recipes.title} />

              <input className="form-control recipe-description" type='text' name='description' onChange={this.handleChange} defaultValue={this.state.recipes.description} />
            </div>
            <div className="save-recipe-div">
              <button className="btn btn-outline-success save-recipe-btn">Save Recipe</button>
            </div>

            <div className="image-create-div col-4">
              <input className="col-12 image-upload card" type='file' name='image' onChange={this.handleImageChange} />
                <div className="image-preview-div card">
                  {this.state.image
                  ?
                    <img className="image-preview card" src={this.state.preview} alt="preview not available" />
                  :
                    <img className="image-preview card" src={this.state.recipes.image} alt="preview not available" />
                  }
                </div>
            </div>


            <div className="recipe-create-div row no-gutters">
              <div className="recipe-ingredient-div card col-3">
                <textarea className="form-control col-12 recipe-ingredient-box"  type='text' name='ingredients' onChange={this.handleChange} defaultValue={this.state.recipes.ingredients} />
              </div>
              <div className="recipe-instructions-div card col-9">
                <textarea className="form-control col-12 recipe-instructions-box"  defaultValue={this.state.recipes.instructions} type='text' name='instructions' onChange={this.handleChange} />
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
