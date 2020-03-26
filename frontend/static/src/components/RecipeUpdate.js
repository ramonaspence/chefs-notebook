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
      } else




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
    .then(response => this.setState(response.data))
    .catch(err => console.log(err));
  }

  render() {
    return(
      <React.Fragment>
      <Nav />
      <div className="row no-gutters">
        <div className="col-10 offset-1">
          <form type='submit' method='put' onSubmit={this.handleSubmit}>
            <label htmlFor="title">Recipe Title:</label>
            <input type='text' name='title' onChange={this.handleChange} defaultValue={this.state.title} />

            <label htmlFor="description">Description:</label>
            <input type='text' name='description' onChange={this.handleChange} defaultValue={this.state.description} />

            <label htmlFor="image">Add an Image for this Recipe</label>
            <input type='file' name='image' onChange={this.handleImageChange} defaultValue={this.state.image} />

            {this.state.image
              ?
            <img src={this.state.image} alt="" />

             :
            <img src={this.state.preview} alt="preview not available" />
            }

            <label htmlFor="ingredients">Keep your list of ingredients here</label>
            <input type='text' name='ingredients' onChange={this.handleChange} defaultValue={this.state.ingredients} />

            <label htmlFor="instructions">Tell us how to make it!</label>
            <input type='text' name='instructions' onChange={this.handleChange} defaultValue={this.state.instructions} />

            <button>Save Recipe</button>
            <button onSubmit={this.handleVersion}>Save as New Version</button>

          </form>
        </div>
      </div>
      </React.Fragment>
    )
  }
}
export default RecipeUpdate;
