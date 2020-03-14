import React, {Component} from 'react';
import '../App.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class RecipeUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: {},
    }

    this.handleImageChange = this.handleImageChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
    console.log('change', this.state);
  }

  handleImageChange(e) {
    e.preventDefault();

    let file = e.target.files[0];

    this.setState({[e.target.name]: file}, () => console.log(this.state));

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.setState({preview: reader.result});
    console.log('img', this.state);
  }

    handleSubmit(e) {
      e.preventDefault();

      console.log(this.state);


      let formData = new FormData();

      formData.append('title', this.state.title);
      formData.append('description', this.state.description);
      formData.append('ingredients', this.state.ingredients);
      formData.append('instructions', this.state.instructions);
      formData.append('tags', this.state.tags);

      //when componentdidmount fires, this.state = empty obj
      //after any edit, this.state = object being edited
      //if image === a file, not url, send with patch request
      //if image === a url, not a file, do not send with patch request

      if (this.state.image === File) {
        formData.append('image', this.state.image);
      } else




    axios.patch(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => console.log(response))
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log(this.props.match);

    // get request to pull in single recipe
    axios.get(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}`)
    .then(response => this.setState(response.data))
    .catch(err => console.log(err));
  }

  render() {
    return(
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

            <button>Save Recipe</button>

          </form>
        </div>
      </div>
    )
  }
}
export default RecipeUpdate;
